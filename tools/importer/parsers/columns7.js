/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the deepest content row with two columns
  const mainRows = element.querySelectorAll('.c-free-text__content > .container > .row');
  if (!mainRows || mainRows.length === 0) return;
  const innerRow = mainRows[0];
  const columns = innerRow.querySelectorAll(':scope > div');

  // Defensive: make sure we have 2 columns
  if (columns.length < 2) return;

  // Column 1: the left column with heading + text
  const col1 = columns[0];
  // Column 2: the right column with the two images
  const col2 = columns[1];

  // Use the actual block name for the header row, as per markdown example
  const headerRow = ['Columns (columns7)'];

  // Compose the table: 1 row with two columns (one for each content section)
  const tableCells = [headerRow, [col1, col2]];

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
