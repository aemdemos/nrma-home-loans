/* global WebImporter */
export default function parse(element, { document }) {
  // Get the section with the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Get direct children of .row (should be columns)
  const columns = Array.from(row.children);

  // For columns9 block, only support 2 columns as in the example
  // Defensive: if there are not exactly two columns, exit
  if (columns.length !== 2) return;

  // For each column, collect all immediate children (preserving structure)
  // Reference the element's real child elements, filtering out empty text nodes
  const col1 = document.createElement('div');
  Array.from(columns[0].childNodes).forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      col1.appendChild(node);
    }
  });
  const col2 = document.createElement('div');
  Array.from(columns[1].childNodes).forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      col2.appendChild(node);
    }
  });

  // Build the table structure as per the example
  const cells = [
    ['Columns (columns9)'],
    [col1, col2]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
