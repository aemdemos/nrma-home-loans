/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the row containing main columns: left (heading, text) & right (badges)
  // The most reliable path is: .container (2nd) > .row (1st)
  let mainRow = null;
  const containers = element.querySelectorAll('.container');
  if (containers.length > 1) {
    const rows = containers[1].querySelectorAll(':scope > .row');
    if (rows.length > 0) {
      mainRow = rows[0];
    }
  }
  if (!mainRow) {
    return; // no content to transform
  }

  // Get the two main columns (left text, right image badges)
  const cols = mainRow.querySelectorAll(':scope > div');
  if (cols.length < 2) {
    return; // not enough columns, do not transform
  }

  // First col: heading and paragraph
  const leftCol = cols[0];
  const leftContent = [];
  // include heading if present
  const heading = leftCol.querySelector('h2, h1, h3, h4, h5, h6');
  if (heading) leftContent.push(heading);
  // include all <p> and direct children (including disclaimers)
  leftCol.childNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'p') {
      leftContent.push(node);
    }
  });

  // Second col: badges (two images inside a .row > two .col-xs-6)
  const rightCol = cols[1];
  // find all images inside right column (deep)
  const images = rightCol.querySelectorAll('img');
  const rightContent = Array.from(images);

  // Assemble the block table
  const headerRow = ['Columns (columns20)'];
  const contentRow = [
    leftContent.length === 1 ? leftContent[0] : leftContent,
    rightContent.length === 1 ? rightContent[0] : rightContent,
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
