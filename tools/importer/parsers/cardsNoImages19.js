/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as per requirements
  const rows = [['Cards (cardsNoImages19)']];

  // Each card is a direct child div
  const cardContainers = element.querySelectorAll(':scope > div');
  cardContainers.forEach((cardContainer) => {
    // Get the heading and description from within the card
    const heading = cardContainer.querySelector('h3, .c-card--product__heading');
    const description = cardContainer.querySelector('.c-card--product__description, p');
    // Create a fragment for the card content
    const frag = document.createDocumentFragment();
    if (heading) frag.appendChild(heading);
    if (description) frag.appendChild(description);
    // Only add card row if there's any content
    if (frag.childNodes.length) {
      rows.push([[], frag]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
