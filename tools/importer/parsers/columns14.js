/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns: left (col-lg-4) and right (col-lg-8)
  const leftCol = element.querySelector('.col-lg-4');
  const rightCol = element.querySelector('.col-lg-8');

  // Defensive: if no columns found, return early
  if (!leftCol && !rightCol) return;

  const headerRow = ['Columns (columns14)'];
  const row = [];
  if (leftCol) row.push(leftCol);
  if (rightCol) row.push(rightCol);

  // Only build the block if there are at least two columns (as in example)
  if (row.length < 2) return;

  const table = WebImporter.DOMUtils.createTable(
    [headerRow, row],
    document
  );

  element.replaceWith(table);
}
