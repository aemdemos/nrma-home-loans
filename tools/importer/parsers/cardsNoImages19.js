/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table, matching the block name and example
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all first-level children which represent cards
  const cardColumns = element.querySelectorAll(':scope > div');
  for (const col of cardColumns) {
    // The card content is inside .c-card--product__content
    const cardContent = col.querySelector('.c-card--product__content');
    if (!cardContent) continue; // skip if structure is broken
    // Try to extract heading and description
    const heading = cardContent.querySelector('h3, .c-card--product__heading');
    const description = cardContent.querySelector('.c-card--product__description');
    // Build the cell contents, referencing existing elements
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    // If no heading or description, fallback to all children
    if (!heading && !description) {
      cellContent.push(...cardContent.childNodes);
    }
    rows.push([cellContent]);
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
