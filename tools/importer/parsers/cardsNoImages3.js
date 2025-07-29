/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container
  const cardsWrapper = element.querySelector('.c-flexible-wrapper.c-benefits');
  if (!cardsWrapper) return;
  // Get all card items
  const cardItems = Array.from(cardsWrapper.querySelectorAll('.c-benefits__item'));

  const rows = [['Cards (cardsNoImages3)']];

  cardItems.forEach(cardItem => {
    const caption = cardItem.querySelector('.c-caption-wrapper');
    if (!caption) return;
    // We'll gather all the relevant content in correct order:
    const cellContent = [];
    // Heading (h2 or h3)
    const heading = caption.querySelector('h2, h3');
    if (heading) cellContent.push(heading);
    // Paragraph (description)
    const description = caption.querySelector('p');
    if (description) cellContent.push(description);
    // CTA link (if present)
    const cta = caption.querySelector('.c-button-wrapper a');
    if (cta) cellContent.push(cta);
    // Only add row if we have some content
    if (cellContent.length) {
      rows.push([cellContent]);
    }
  });

  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
