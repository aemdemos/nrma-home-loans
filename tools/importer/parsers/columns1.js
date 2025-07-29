/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container for columns
  const grid = element.querySelector('.container-grid');
  if (!grid) return;
  const left = grid.querySelector('.c-hero-header-key-callout__content-wrapper');
  const right = grid.querySelector('.c-hero-header-key-callout__image-wrapper');

  // LEFT: the main content
  let leftCell = [];
  if (left) {
    const body = left.querySelector('.c-content-container__body');
    if (body) leftCell.push(body);
    else leftCell.push(left);
  }

  // RIGHT: the image (from style attribute)
  let rightCell = [];
  if (right) {
    const style = right.getAttribute('style') || '';
    let imgURL = null;
    const large = style.match(/--image-large:\s*url\('([^']+)'\)/);
    const med = style.match(/--image-medium:\s*url\('([^']+)'\)/);
    const small = style.match(/--image-small:\s*url\('([^']+)'\)/);
    if (large) imgURL = large[1];
    else if (med) imgURL = med[1];
    else if (small) imgURL = small[1];
    if (imgURL) {
      const img = document.createElement('img');
      img.src = imgURL;
      img.alt = '';
      rightCell.push(img);
    }
  }

  // Header row must be a single column (one cell)
  const cells = [
    ['Columns (columns1)'],
    [leftCell, rightCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
