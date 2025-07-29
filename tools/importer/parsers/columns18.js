/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two major columns: content and image
  const grid = element.querySelector('.container-grid');
  if (!grid) return;
  const columns = grid.querySelectorAll(':scope > div');
  // Defensive: must have at least two columns
  if (columns.length < 2) return;

  // 1. LEFT COLUMN: Collect all relevant content
  const leftCol = columns[0];
  // This column contains the content structure, preserve as-is

  // 2. RIGHT COLUMN: Collect image if available
  const rightCol = columns[1];
  let rightCell;
  if (rightCol) {
    // Try to extract a background image from --image-large/medium/small if present
    const style = rightCol.getAttribute('style') || '';
    let imgUrl = null;
    // Prefer --image-large then medium then small
    let m = style.match(/--image-large:\s*url\('([^']+)'\)/);
    if (m) {
      imgUrl = m[1];
    } else {
      m = style.match(/--image-medium:\s*url\('([^']+)'\)/);
      if (m) {
        imgUrl = m[1];
      } else {
        m = style.match(/--image-small:\s*url\('([^']+)'\)/);
        if (m) {
          imgUrl = m[1];
        }
      }
    }
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = '';
      rightCell = img;
    } else {
      // If no image URL, keep the wrapper in case it contains content
      rightCell = rightCol;
    }
  } else {
    // Defensive: create empty cell if no right column
    rightCell = document.createTextNode('');
  }

  // Build the table for the Columns (columns18) block
  const cells = [
    ['Columns (columns18)'], // header exactly as required
    [leftCol, rightCell], // each a column as in the visual example
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
