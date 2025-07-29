/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cardContainers = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardContainers.forEach(cardContainer => {
    // Icon cell (could be an icon-wrapper or similar)
    let icon = cardContainer.querySelector('.icon-wrapper');
    // Text cell (heading + description + CTA)
    const textCell = document.createElement('div');
    // Heading (h3)
    const heading = cardContainer.querySelector('h3, .c-card--product__heading');
    if (heading) textCell.appendChild(heading);
    // Description
    const description = cardContainer.querySelector('.c-card--product__description');
    if (description) {
      // Move all children (e.g., paragraph) into textCell
      Array.from(description.childNodes).forEach(node => {
        textCell.appendChild(node);
      });
    }
    // Call-to-action button/link
    const cta = cardContainer.querySelector('.c-button-wrapper-stack a, a.c-link--button__secondary, a[aria-label]');
    if (cta) textCell.appendChild(cta);
    rows.push([icon, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
