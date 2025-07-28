/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left content (headline + supporting copy)
  const contentContainer = element.querySelector('.c-content-container__body');
  let leftContent = '';
  if (contentContainer) {
    leftContent = contentContainer;
  }

  // Extract right content (image from style background)
  const imgWrapper = element.querySelector('.c-hero-header-key-callout__image-wrapper');
  let rightContent = '';
  if (imgWrapper) {
    const style = imgWrapper.getAttribute('style') || '';
    let imgUrl = '';
    const matchLarge = style.match(/--image-large:\s*url\('([^']+)'\)/);
    const matchMedium = style.match(/--image-medium:\s*url\('([^']+)'\)/);
    const matchSmall = style.match(/--image-small:\s*url\('([^']+)'\)/);
    if (matchLarge) {
      imgUrl = matchLarge[1];
    } else if (matchMedium) {
      imgUrl = matchMedium[1];
    } else if (matchSmall) {
      imgUrl = matchSmall[1];
    }
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = '';
      rightContent = img;
    }
  }

  // Header row: only one cell as required by spec
  const headerRow = ['Columns (columns7)'];
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
