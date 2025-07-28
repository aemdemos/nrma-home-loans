/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Accordion block, matches the specified format
  const cells = [
    ['Accordion (accordion4)']
  ];

  // Get all accordion items (direct children of the accordion root element)
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // Get the accordion title
    let titleEl = item.querySelector('.c-accordion__header-button .item-title');
    let titleCell;
    if (titleEl) {
      // Use the reference to the span, not its text
      titleCell = titleEl;
    } else {
      // Fallback to button text if no .item-title exists
      const btn = item.querySelector('.c-accordion__header-button');
      if (btn) {
        titleCell = document.createTextNode(btn.textContent.trim());
      } else {
        titleCell = document.createTextNode('');
      }
    }

    // Get the accordion content: prefer the details div, fallback to content div
    let contentCell = item.querySelector('.c-accordion__content__details');
    if (!contentCell) {
      contentCell = item.querySelector('.c-accordion__content');
    }
    // If still not found, fallback to an empty div
    if (!contentCell) {
      contentCell = document.createElement('div');
    }

    cells.push([titleCell, contentCell]);
  });

  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
