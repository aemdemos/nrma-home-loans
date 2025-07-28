/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header as per spec
  const headerRow = ['Accordion (accordion5)'];

  // The array of rows for the table
  const rows = [headerRow];

  // Get all accordion items (direct children)
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title cell: button > .item-title
    let titleText = '';
    const button = item.querySelector('button.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        titleText = span.textContent.trim();
      } else {
        titleText = button.textContent.trim();
      }
    }

    // Content cell: .c-accordion__content__details or fallback
    let contentEl = item.querySelector('.c-accordion__content__details');
    if (!contentEl) {
      // fallback to .c-accordion__content if details missing
      contentEl = item.querySelector('.c-accordion__content');
    }
    if (!contentEl) {
      // fallback to an empty div if no content found
      contentEl = document.createElement('div');
    }

    rows.push([titleText, contentEl]);
  });

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}