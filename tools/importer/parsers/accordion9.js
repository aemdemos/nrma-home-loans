/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required, matching the block name exactly
  const headerRow = ['Accordion (accordion9)'];
  // Find all direct accordion items
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));
  const rows = items.map((item) => {
    // Title: button > .item-title span, or fallback to button text
    const btn = item.querySelector('.c-accordion__header-button');
    let titleText = '';
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span && span.textContent) {
        titleText = span.textContent.trim();
      } else {
        titleText = btn.textContent.trim();
      }
    }
    // Title cell: Use a <span> to preserve plain text status in cell
    const titleCell = document.createElement('span');
    titleCell.textContent = titleText;
    // Content: Use the .c-accordion__content__details if present, else .c-accordion__content, else empty div
    let contentEl = item.querySelector('.c-accordion__content__details')
      || item.querySelector('.c-accordion__content')
      || document.createElement('div');
    // Reference the actual element (do not clone)
    return [titleCell, contentEl];
  });
  // Compose cells for table
  const cells = [headerRow, ...rows];
  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
