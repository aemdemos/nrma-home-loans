/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  // Count the number of columns for header row: for this block, always 2 (title, content)
  const numCols = 2;

  // Build the header row with the correct colspan
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Accordion (accordion5)';
  headerCell.colSpan = numCols;
  const headerRow = [headerCell];

  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell
    let titleEl = null;
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        titleEl = span;
      } else {
        titleEl = button;
      }
    }
    // Content cell
    let contentEl = item.querySelector('.c-accordion__content__details');
    if (!contentEl) {
      contentEl = item.querySelector('.c-accordion__content') || item.querySelector('.c-accordion__content-wrapper');
    }
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
