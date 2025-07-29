/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the block name: 'Cards'
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Get all card elements in the section
  const cardElements = element.querySelectorAll('.c-card');
  cardElements.forEach((card) => {
    const cellContent = [];

    // Card title (h3)
    const heading = card.querySelector('.c-card__content h3');
    if (heading) cellContent.push(heading);

    // If there are CTAs, they are in the .c-button-wrapper-stack
    const buttonWrapper = card.querySelector('.c-button-wrapper-stack');
    if (buttonWrapper) {
      // Place all links on new lines
      const links = buttonWrapper.querySelectorAll('a');
      links.forEach((link, idx) => {
        if (idx > 0) cellContent.push(document.createElement('br'));
        cellContent.push(link);
      });
    }
    rows.push([[], cellContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}