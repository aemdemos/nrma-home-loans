/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main free text content area
  const content = element.querySelector('.c-free-text__content');
  if (!content) return;

  // Find the innermost .container > .row that contains columns
  let mainRow = null;
  const containers = content.querySelectorAll('.container');
  for (const container of containers) {
    const row = container.querySelector('.row');
    if (row && row.children.length >= 2) {
      mainRow = row;
      break;
    }
  }
  if (!mainRow) return;

  // There should be at least 2 columns: left (text), right (svg/logo)
  const columns = mainRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Build the table structure
  const headerRow = ['Columns (columns6)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
