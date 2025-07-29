/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Prepare the block header row
  const cells = [['Accordion (accordion11)']];

  // Step 2: Select all accordion items directly under the main element
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach(item => {
    // Title cell: Prefer the span inside the button for the question/title
    let titleCell = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        titleCell = span;
      } else {
        titleCell = button;
      }
    }

    // Content cell: use content details div, or empty string if not found
    let contentCell = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Use all children if any, otherwise the whole details element
      if (details.children.length > 0) {
        contentCell = Array.from(details.children);
      } else {
        contentCell = details;
      }
    }
    // Push as a row: [titleCell, contentCell]
    cells.push([titleCell, contentCell]);
  });

  // Step 3: Build and replace the element with the new table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
