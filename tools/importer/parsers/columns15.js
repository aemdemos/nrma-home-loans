/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant container inside the element
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the heading (likely h2, optional)
  const heading = container.querySelector('h2');

  // Find the icons row (.c-cvp-icons__items) and the icon items
  const iconsRow = container.querySelector('.c-cvp-icons__items');
  if (!iconsRow) return;
  const iconItems = Array.from(iconsRow.children).filter(child => child.classList.contains('c-cvp-icon-item'));

  // For each icon item, collect the icon (img) and its descriptive content
  const columns = iconItems.map(item => {
    // Reference the existing img
    const img = item.querySelector('img');
    // Reference the existing content div
    const contentDiv = item.querySelector('.c-cvp-icon-item__content');
    // Compose a fragment for the cell
    const frag = document.createElement('div');
    if (img) frag.appendChild(img);
    // Append all children of contentDiv (to avoid unnecessary <div> wrappers)
    if (contentDiv) {
      Array.from(contentDiv.childNodes).forEach(child => {
        frag.appendChild(child);
      });
    }
    return frag;
  });

  // Build the block table for Columns (columns15)
  const rows = [];
  rows.push(['Columns (columns15)']); // Header
  rows.push(columns); // The row of columns

  // Create the block table using existing elements
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the entire original element with the heading (if exists) and the block table
  if (heading) {
    // Remove heading from container so it only appears once
    container.removeChild(heading);
    element.replaceWith(heading, block);
  } else {
    element.replaceWith(block);
  }
}
