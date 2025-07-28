/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column section
  const twoColSection = element.querySelector('.c-two-col-generic');
  if (!twoColSection) return;

  // Get the row containing the columns
  const row = twoColSection.querySelector('.row.u-flex-wrapper, .row.no-gutters.u-flex-wrapper, .row.no-gutters');
  if (!row) return;

  // Get the two columns (left: image, right: content)
  const colDivs = row.querySelectorAll(':scope > div');
  if (colDivs.length < 2) return;

  // LEFT COLUMN: image background
  const imageCol = colDivs[0];
  let imgEl = null;
  const bgStyle = imageCol.getAttribute('style') || '';
  const match = bgStyle.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/i);
  if (match && match[1]) {
    imgEl = document.createElement('img');
    imgEl.src = match[1];
    imgEl.alt = '';
  }
  // If no image found, put empty string to maintain column structure
  const leftCell = imgEl || '';

  // RIGHT COLUMN: All content (heading, paragraph, list, buttons)
  const textCol = colDivs[1];
  // We'll collect both the card content and the buttons
  const contents = [];
  const cardContent = textCol.querySelector('.c-card__content');
  if (cardContent) contents.push(cardContent);
  const buttonWrapper = textCol.querySelector('.c-button-wrapper');
  if (buttonWrapper) contents.push(buttonWrapper);
  // If both not found, keep column empty
  const rightCell = contents.length ? contents : '';

  // Compose table rows
  const cells = [
    ['Columns (columns17)'],
    [leftCell, rightCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
