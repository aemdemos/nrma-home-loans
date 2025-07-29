/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner two-column section
  const twoColSection = element.querySelector('.c-two-col-generic.c-flexible-wrapper');
  if (!twoColSection) return;

  // Find the top-level row container for columns
  const container = twoColSection.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Usually the first child is image, the second is text/content
  const colDivs = row.querySelectorAll(':scope > div');
  if (colDivs.length < 2) return;

  // === Left column ===
  // This is a background image on a div
  const imageWrapper = colDivs[0];
  let bgUrl = '';
  const style = imageWrapper.getAttribute('style') || '';
  const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
  if (match) {
    bgUrl = match[1];
  }
  let imgEl = null;
  if (bgUrl) {
    imgEl = document.createElement('img');
    imgEl.src = bgUrl;
    imgEl.alt = '';
  }

  // === Right column ===
  // We'll keep the card content and button wrapper as-is for maximum resilience
  const textCol = colDivs[1];
  const card = textCol.querySelector('.c-card');
  let rightColContent = [];
  if (card) {
    const cardContent = card.querySelector('.c-card__content');
    if (cardContent) rightColContent.push(cardContent);
    const buttonWrapper = card.querySelector('.c-button-wrapper');
    if (buttonWrapper) rightColContent.push(buttonWrapper);
  } else {
    // fallback: just grab all children in the textCol
    rightColContent = Array.from(textCol.children);
  }

  // === Compose block table ===
  const cells = [
    ['Columns (columns8)'],
    [imgEl, rightColContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
