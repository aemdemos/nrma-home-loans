/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main row containing columns
  const row = element.querySelector('.row');
  let columns = [];
  if (row) {
    columns = Array.from(row.children);
  } else {
    // fallback, just in case
    columns = Array.from(element.querySelectorAll(':scope > div'));
  }

  // Find the left (image) column and right (text) column
  let imageCell = null;
  let textCell = null;
  columns.forEach(col => {
    if (col.classList.contains('c-two-col-generic__image-wrapper')) {
      // Background image as <img>
      const style = col.getAttribute('style') || '';
      const urlMatch = style.match(/url\(("|')?(.*?)\1\)/i);
      if (urlMatch && urlMatch[2]) {
        const img = document.createElement('img');
        img.src = urlMatch[2];
        img.alt = '';
        imageCell = img;
      } else {
        imageCell = col;
      }
    } else if (col.classList.contains('c-two-col-generic__text-wrapper')) {
      // Use the .c-card as the main text container if available
      const card = col.querySelector('.c-card');
      textCell = card ? card : col;
    }
  });

  // Fallback if columns not found properly (shouldn't happen with the given HTML)
  if (!imageCell && columns[0]) imageCell = columns[0];
  if (!textCell && columns[1]) textCell = columns[1];

  // Build the block table
  const headerRow = ['Columns (columns17)'];
  const contentRow = [imageCell, textCell].filter(Boolean);

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
