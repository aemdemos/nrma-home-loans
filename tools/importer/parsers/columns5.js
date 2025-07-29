/* global WebImporter */
export default function parse(element, { document }) {
  // The structure is: .container > .row > .col-lg-4 + .col-lg-8
  const container = element.querySelector('.container');
  let columns = [];
  if (container) {
    const row = container.querySelector('.row');
    if (row) {
      // Only direct children columns
      const colDivs = Array.from(row.children).filter(child => child.classList.contains('col-lg-4') || child.classList.contains('col-lg-8'));
      if (colDivs.length > 0) {
        columns = colDivs;
      }
    }
  }
  // Fallback: if not found, use all direct children of the element
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }
  // Defensive: if still empty, treat the whole element as a single column
  if (columns.length === 0) {
    columns = [element];
  }

  // Only reference the actual columns. Do not clone, do not create new elements.
  // Header must match block name exactly:
  const cells = [
    ['Columns (columns5)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
