/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row with columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get direct column children
  const columns = Array.from(row.querySelectorAll(':scope > div'));
  if (columns.length === 0) return;
  // The block header as required
  const headerRow = ['Columns (columns14)'];
  // The content row contains a cell for each column
  const contentRow = columns;
  // Create the block table with header and content
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the source element with the block
  element.replaceWith(block);
}
