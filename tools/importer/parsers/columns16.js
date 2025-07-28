/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost .row with two columns (content and logo)
  let columnsRow = null;
  // Try to find the two column row
  element.querySelectorAll('.row').forEach(row => {
    const directCols = Array.from(row.children).filter(child => child.className && child.className.match(/col(-|_)(md|xs)-/));
    if (directCols.length === 2) {
      // Prefer two columns
      columnsRow = row;
    }
  });
  if (!columnsRow) {
    // fallback: find .row which contains both h2 and svg
    columnsRow = element.querySelector('.row h2')?.closest('.row');
  }
  if (!columnsRow) {
    // fallback: just pick the first .row
    columnsRow = element.querySelector('.row');
  }
  if (!columnsRow) {
    // fallback: just use the element itself
    columnsRow = element;
  }

  // Get columns (should be 2: left text, right logo)
  let cols = Array.from(columnsRow.children).filter(child => child.className && child.className.match(/col(-|_)(md|xs)-/));
  if (cols.length === 0) {
    // fallback: take all children
    cols = Array.from(columnsRow.children);
  }

  // Ensure we only take the first two for the two column structure
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Defensive: If leftCol or rightCol is undefined, use empty divs
  const leftContent = leftCol || document.createElement('div');
  const rightContent = rightCol || document.createElement('div');

  // Compose the table for Columns (columns16) block
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftContent, rightContent];
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(block);
}
