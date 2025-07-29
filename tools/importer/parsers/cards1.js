/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card row container
  const group = element.querySelector('.c-cross-link-tile-group .row');
  if (!group) return;

  // Get all card columns
  const cardCols = group.querySelectorAll(':scope > .col-md-6');

  // Build the table rows: header row should have ONLY one cell, data rows two cells
  const rows = [];
  // Header row: single cell
  rows.push(['Cards (cards1)']);

  // Data rows: two cells (image/icon, text content)
  cardCols.forEach(col => {
    // Find the card elements
    const card = col.querySelector('.c-card');
    if (!card) return;
    const contentInner = card.querySelector('.c-card__inner');
    if (!contentInner) return;
    const content = contentInner.querySelector('.c-card__content');
    const ctaWrapper = contentInner.querySelector('.c-button-wrapper-stack');

    // Build the text content cell
    const textCell = document.createElement('div');
    if (content) {
      Array.from(content.childNodes).forEach(node => {
        textCell.appendChild(node);
      });
    }
    if (ctaWrapper) {
      const ctaDiv = document.createElement('div');
      Array.from(ctaWrapper.childNodes).forEach(node => {
        ctaDiv.appendChild(node);
      });
      textCell.appendChild(ctaDiv);
    }

    // First cell: image/icon (empty for this variant)
    // Second cell: the card text content
    rows.push(['', textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
