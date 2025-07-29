/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches block name/variant
  const rows = [
    ['Cards (cardsNoImages1)']
  ];

  // Defensive: find main wrapper for cards
  const wrapperSection = element.querySelector('section.c-flexible-wrapper');
  if (!wrapperSection) return;
  const container = wrapperSection.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  // Each col is a card
  const cardCols = row.querySelectorAll(':scope > div');
  cardCols.forEach(cardCol => {
    const card = cardCol.querySelector('.c-card');
    if (!card) return;
    const inner = card.querySelector('.c-card__inner');
    if (!inner) return;
    // Card content section: heading and description
    const cardContent = inner.querySelector('.c-card__content');
    // Buttons
    const btnWrapper = inner.querySelector('.c-button-wrapper-stack');
    // Prepare array of all content for this card
    const cellContent = [];
    if (cardContent && cardContent.children.length > 0) {
      Array.from(cardContent.children).forEach(child => cellContent.push(child));
    }
    // Add all CTAs/links as-is if present
    if (btnWrapper) {
      Array.from(btnWrapper.children).forEach(child => cellContent.push(child));
    }
    // Add row only if we have content (defensive)
    if (cellContent.length > 0) {
      rows.push([[], cellContent]);
    }
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
