/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container holding the columns
  const container = element.querySelector('.container-grid');
  if (!container) return;

  // Left column: content
  let leftCol = container.querySelector('.c-hero-header-key-callout__content-wrapper');
  // For leftCol, extract just the .c-content-container if present
  if (leftCol) {
    const contentContainer = leftCol.querySelector('.c-content-container');
    if (contentContainer) leftCol = contentContainer;
  }

  // Right column: image (from style background-image)
  let rightCol = container.querySelector('.c-hero-header-key-callout__image-wrapper');
  let rightCell = rightCol;
  if (rightCol) {
    const style = rightCol.getAttribute('style') || '';
    let imageUrl = '';
    const largeMatch = style.match(/--image-large: url\('([^']+)'\)/);
    const mediumMatch = style.match(/--image-medium: url\('([^']+)'\)/);
    const smallMatch = style.match(/--image-small: url\('([^']+)'\)/);
    if (largeMatch) {
      imageUrl = largeMatch[1];
    } else if (mediumMatch) {
      imageUrl = mediumMatch[1];
    } else if (smallMatch) {
      imageUrl = smallMatch[1];
    }
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '';
      const wrapper = document.createElement('div');
      wrapper.appendChild(img);
      rightCell = wrapper;
    }
  }

  // The header row must have only ONE cell, with the exact header text
  const headerRow = ['Columns (columns18)'];
  // The content row contains as many columns as present (2 in this case)
  const contentRow = [];
  if (leftCol) contentRow.push(leftCol);
  if (rightCell) contentRow.push(rightCell);
  // Ensure we always have 2 columns for this layout
  while (contentRow.length < 2) {
    contentRow.push(document.createElement('div'));
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
