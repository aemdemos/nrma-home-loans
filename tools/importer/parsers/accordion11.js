/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block table header, as per block name and requirements
  const headerRow = ['Accordion (accordion11)'];
  const rows = [headerRow];
  // Select all accordion items directly under the main accordion container
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title cell: get the span with the item-title class inside the header button
    let titleEl = item.querySelector('.c-accordion__header-button .item-title');
    if (!titleEl) {
      // fallback: use button or h3 if .item-title span is missing
      const btn = item.querySelector('.c-accordion__header-button');
      if (btn) {
        titleEl = btn;
      } else {
        const h3 = item.querySelector('h3');
        titleEl = h3 ? h3 : document.createTextNode('');
      }
    }
    // Content cell: use all children of .c-accordion__content__details (to preserve formatting and links)
    let contentCell;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Gather all child nodes that are elements or non-empty text nodes
      const nodes = Array.from(details.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== ''));
      if (nodes.length === 1) {
        contentCell = nodes[0];
      } else {
        contentCell = nodes;
      }
    } else {
      // fallback: try .c-accordion__content
      const content = item.querySelector('.c-accordion__content');
      if (content) {
        const nodes = Array.from(content.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== ''));
        contentCell = nodes.length === 1 ? nodes[0] : nodes;
      } else {
        contentCell = document.createTextNode('');
      }
    }
    rows.push([titleEl, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
