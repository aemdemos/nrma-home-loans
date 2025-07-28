/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards container
  let cardsSection = element.querySelector('.c-benefits');
  if (!cardsSection) {
    cardsSection = element;
  }

  // Get all card items
  const cardItems = Array.from(cardsSection.querySelectorAll('.c-benefits__item'));
  // Handle case where there are no items
  const rows = cardItems.map(cardItem => {
    // .c-caption-wrapper usually contains the heading, paragraph, and CTA
    const content = cardItem.querySelector('.c-caption-wrapper');
    return [content];
  });
  // If there are no cards, still output the table header
  const tableCells = [
    ['Cards (cardsNoImages3)'],
    ...rows
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(blockTable);
}
