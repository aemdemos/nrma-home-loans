/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner container that holds the heading and icons
  const mainContainer = element.querySelector('.c-flexible-wrapper.c-cvp-icons');
  if (!mainContainer) return;

  // Get the main h2 heading if present
  const heading = mainContainer.querySelector('h2');
  let headingEl = null;
  if (heading) {
    headingEl = heading; // Reference the actual element, do not clone
  }

  // Get the icons row (columns)
  const iconsRow = mainContainer.querySelector('.c-cvp-icons__items');
  if (!iconsRow) return;

  // Get all .c-cvp-icon-item elements (each column)
  const iconItems = Array.from(iconsRow.querySelectorAll(':scope > .c-cvp-icon-item'));
  if (iconItems.length === 0) return;

  // For each icon-item (column), compose the content as an array
  const columns = iconItems.map(item => {
    const contents = [];
    // Reference the first image in the column if present
    const img = item.querySelector('img');
    if (img) contents.push(img);
    // Reference the content div with the text (preserves substructure, <p>, <sup>, etc)
    const contentDiv = item.querySelector('.c-cvp-icon-item__content');
    if (contentDiv) contents.push(contentDiv);
    return contents;
  });

  // Table header must exactly match the block name
  const headerRow = ['Columns (columns15)'];

  let cells;
  // If there's a heading, put it as a paragraph (single cell) row before the main columns row, spanning all columns
  if (headingEl) {
    cells = [
      headerRow,
      [headingEl],
      columns
    ];
  } else {
    cells = [
      headerRow,
      columns
    ];
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
