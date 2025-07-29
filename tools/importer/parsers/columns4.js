/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the main content area (card content), fallback to col if not found
  const columnContents = columns.map(col => {
    const content = col.querySelector('.c-card--product__content');
    return content || col;
  });

  // Build the cells array as specified: header row is one single cell, then second row contains all columns
  const cells = [
    ['Columns (columns4)'], // Header row: exactly one cell
    columnContents          // Second row: one cell per column
  ];

  // Create the block table using the helper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}