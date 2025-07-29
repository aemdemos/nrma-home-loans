/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row containing the columns
  const mainRow = element.querySelector('.c-free-text__content > .container > .row');
  if (!mainRow) return;

  // Find the columns for content and images
  let col1 = null;
  let col2 = null;
  const columns = mainRow.querySelectorAll(':scope > div');
  if (columns.length >= 2) {
    col1 = columns[0];
    col2 = columns[1];
  } else {
    // fallback: if structure is different, check for 8/4 split classes
    col1 = mainRow.querySelector('.col-xs-12.col-md-8') || columns[0];
    col2 = mainRow.querySelector('.col-xs-12.col-md-4') || columns[1];
  }
  // Defensive: if any is missing, skip
  if (!col1 || !col2) return;

  // Build the block table
  const cells = [
    ['Columns (columns20)'],
    [col1, col2],
  ];

  // Create and insert the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
