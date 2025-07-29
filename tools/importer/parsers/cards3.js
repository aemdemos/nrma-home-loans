/* global WebImporter */
export default function parse(element, { document }) {
  // Find all cards in the carousel
  const slides = element.querySelectorAll('.swiper-slide.c-carousel__swiper-slide');
  // Header row: must be a single cell spanning both columns
  const rows = [
    [{
      colspan: 2,
      content: 'Cards (cards3)'
    }]
  ];
  slides.forEach((slide) => {
    const card = slide.querySelector('.c-product-selector__card');
    if (!card) return;
    // There are no images/icons for these cards, so first cell is empty string
    // Second cell: all content of the card
    const contentNodes = Array.from(card.children).filter(
      child => child.nodeType === 1 // Element nodes only
    );
    rows.push(['', contentNodes]);
  });

  // Patch for createTable: convert {colspan: n, content: v} header to proper th with colspan
  // (if your createTable supports only arrays of cells, then this approach may need to be adjusted)
  // For WebImporter.DOMUtils.createTable, arrays of arrays; but to support colspan, we patch header cell manually below:
  const table = WebImporter.DOMUtils.createTable(
    rows.map((row, idx) => {
      if (idx === 0 && row[0] && row[0].colspan) {
        // just pass the string, we'll set colspan manually on the th
        return [row[0].content];
      }
      return row;
    }),
    document
  );
  // Set colspan on the first header cell
  const th = table.querySelector('tr:first-child th');
  if (th) th.colSpan = 2;
  element.replaceWith(table);
}
