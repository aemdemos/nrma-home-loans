/* global WebImporter */
export default function parse(element, { document }) {
  // Safe extraction of the .row with columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get ONLY the immediate column children (preserves order)
  const columns = Array.from(row.children).filter(
    (col) => col.classList.contains('col-lg-4') || col.classList.contains('col-lg-8')
  );

  // Defensive: Ensure there are 2 columns
  if (columns.length < 2) return;

  // Reference actual column elements (do not clone or create new)
  const col1 = columns[0];
  const col2 = columns[1];

  // Set up the columns table as per block requirements
  const headerRow = ['Columns (columns22)'];
  const contentRow = [col1, col2];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
