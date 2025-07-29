/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main wrapper of the columns (guaranteed by context)
  const container = element.querySelector('.container');
  if (!container) return;

  // Extract heading if present
  const heading = container.querySelector('h2');

  // Extract columns wrapper
  const columnsWrapper = container.querySelector('.c-cvp-icons__items');
  if (!columnsWrapper) return;

  // Get all direct children as columns
  const columnElements = Array.from(columnsWrapper.children).filter(child => child.classList.contains('c-cvp-icon-item'));

  // For each column, extract its image and content, and combine them (maintaining original elements)
  const columnCells = columnElements.map((col) => {
    // Get the main image and the content
    const img = col.querySelector('img');
    const content = col.querySelector('.c-cvp-icon-item__content');

    // Combine image and content in a div (do not clone, just reference)
    const wrapper = document.createElement('div');
    if (img) wrapper.appendChild(img);
    if (content) {
      // Append all children of content (such as <p>, with its children/sup/a)
      Array.from(content.childNodes).forEach(node => wrapper.appendChild(node));
    }
    return wrapper;
  });

  // Header row, as required
  const headerRow = ['Columns (columns2)'];
  // Content row: one cell per column
  const contentRow = columnCells;

  // Construct the table as per spec
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // If heading exists, it should be placed above the block table, maintaining semantic structure
  if (heading) {
    element.replaceWith(heading, table);
  } else {
    element.replaceWith(table);
  }
}
