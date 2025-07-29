/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name exactly as required
  const rows = [['Accordion']];
  // Get all direct child accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Extract the title cell (prefer the span.item-title if present)
    let titleCell = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      titleCell = span ? span : button;
    } else {
      // fallback: try h3
      const h3 = item.querySelector('h3');
      titleCell = h3 ? h3 : '';
    }

    // Extract the content cell (the details div, which may contain multiple paragraphs/links)
    let contentCell = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // If there is more than 1 child, use all children in an array
      if (details.children.length > 1) {
        contentCell = Array.from(details.children);
      } else if (details.children.length === 1) {
        contentCell = details.firstElementChild;
      } else {
        contentCell = details;
      }
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
