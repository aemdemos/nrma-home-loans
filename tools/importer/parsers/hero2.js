/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches the block name exactly as in the example
  const headerRow = ['Hero'];

  // 2. No background image is present in the HTML, so 2nd row is empty string
  const bgRow = [''];

  // 3. Extract the main content (heading and paragraph)
  // Look for .c-free-text__content > h2 and <p>
  let content = element.querySelector('.c-free-text__content');
  let contentElements = [];
  if (content) {
    // Grab all children that are headings or paragraphs
    content.querySelectorAll('h1,h2,h3,h4,h5,h6,p').forEach(el => {
      contentElements.push(el);
    });
  }
  // Fallback if .c-free-text__content is not found
  if (contentElements.length === 0) {
    // Gather all direct children headings and paragraphs from the element
    element.querySelectorAll('h1,h2,h3,h4,h5,h6,p').forEach(el => {
      contentElements.push(el);
    });
  }

  // If nothing is found, put an empty string
  if (contentElements.length === 0) {
    contentElements = [''];
  }

  // 4. Build the table
  const cells = [
    headerRow,
    bgRow,
    [contentElements]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
