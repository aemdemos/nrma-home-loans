/* global WebImporter */
export default function parse(element, { document }) {
  // Find the flexible wrapper section containing the columns block
  const flexSection = element.querySelector('.c-flexible-wrapper');
  if (!flexSection) return;

  // Inside .c-flexible-wrapper, find the container > row > columns
  const row = flexSection.querySelector('.container > .row');
  if (!row) return;

  // The columns are direct children of the .row (e.g., .col-lg-4, .col-lg-8)
  const columns = Array.from(row.children);

  // For columns block, each cell is all content within that col-*
  // Use childNodes, not children, to capture text, elements, etc.
  const contentRow = columns.map(col => Array.from(col.childNodes));

  // Block table header must match exactly
  const cells = [
    ['Columns (columns22)'],
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the structured table block
  element.replaceWith(table);
}
