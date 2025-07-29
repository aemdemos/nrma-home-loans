/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion wrapper
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Prepare header row for the block table
  const headerRow = ['Accordion (accordion8)'];

  // Collect all accordion items
  const items = Array.from(accordion.querySelectorAll(':scope > .c-accordion__item'));
  const rows = items.map((item) => {
    // Title cell: use the span with .item-title inside the button if available, else button, else h3
    let titleCell = '';
    const btn = item.querySelector('.c-accordion__header-button');
    if (btn) {
      const titleSpan = btn.querySelector('.item-title');
      if (titleSpan) {
        titleCell = titleSpan;
      } else {
        titleCell = btn;
      }
    } else {
      const h3 = item.querySelector('h3');
      if (h3) {
        titleCell = h3;
      }
    }

    // Content cell: use the .c-accordion__content__details if present, else .c-accordion__content, else empty
    let contentCell = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      contentCell = details;
    } else {
      const contentDiv = item.querySelector('.c-accordion__content');
      if (contentDiv) {
        contentCell = contentDiv;
      }
    }

    return [titleCell, contentCell];
  });

  // Compose the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
