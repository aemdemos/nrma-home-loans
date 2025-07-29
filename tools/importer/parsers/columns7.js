/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column: content (heading + supporting copy)
  const leftWrapper = element.querySelector('.c-hero-header-key-callout__content-wrapper');
  const leftCol = leftWrapper || '';

  // Extract right column: image (from background-image style if any)
  const imgWrapper = element.querySelector('.c-hero-header-key-callout__image-wrapper');
  let rightCol = '';
  if (imgWrapper) {
    const style = imgWrapper.getAttribute('style') || '';
    let imgUrl = null;
    let match = /--image-large:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (!match) match = /--image-medium:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (!match) match = /--image-small:\s*url\(['"]?([^'"]+)['"]?\)/.exec(style);
    if (match) {
      imgUrl = match[1];
    }
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.setAttribute('loading', 'lazy');
      rightCol = img;
    }
  }

  // Header row: only one cell (block name), as required
  const headerRow = ['Columns (columns7)'];
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
