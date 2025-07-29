/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header cell with colspan=2
  const headerCell = document.createElement('th');
  headerCell.setAttribute('colspan', '2');
  headerCell.textContent = 'Accordion (accordion21)';
  const headerRow = [headerCell];
  const rows = [headerRow];

  // Get all accordion items (direct children with the accordion item class)
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // Title cell: Find the button with the title span
    let titleButton = item.querySelector('.c-accordion__header-button');
    let titleSpan = titleButton && titleButton.querySelector('.item-title');
    let titleContent = titleSpan ? titleSpan.textContent.trim() : '';
    // Use a <p> for title for structure
    const titleCell = document.createElement('p');
    titleCell.textContent = titleContent;

    // Content cell: Find the accordion content details
    let details = item.querySelector('.c-accordion__content__details');
    let contentCell = null;
    if (details) {
      // Move all children of details into a fragment
      const fragment = document.createDocumentFragment();
      Array.from(details.childNodes).forEach((node) => {
        fragment.appendChild(node);
      });
      contentCell = fragment;
    } else {
      // fallback: just put an empty div
      contentCell = document.createElement('div');
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
