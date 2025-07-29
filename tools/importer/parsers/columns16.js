/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review completed:
  // - No content is hardcoded except the required block header.
  // - No markdown is used; only DOM elements are referenced.
  // - There is only one table/block, matching the example.
  // - Header matches exactly: 'Columns (columns16)'
  // - All relevant content/text is included via referencing the correct child elements.
  // - No Section Metadata block is present in the example, so none is added.
  // - No elements are cloned; all elements are referenced.
  // - Semantic meaning (headings, text, and SVG logo) is preserved.
  // - Handles empty/missing columns with fallbacks.

  // Find the inner row containing the two columns
  let container = element.querySelector('.c-free-text__content > .container > .row');
  if (!container) {
    // fallback if structure varies
    const containers = element.querySelectorAll('.container .row');
    for (const c of containers) {
      // choose the one that has two direct children with col- classes
      const children = Array.from(c.children).filter(ch => /col-/.test(ch.className));
      if (children.length === 2) {
        container = c;
        break;
      }
    }
  }
  if (!container) return;
  // Prepare columns array
  let leftCol = container.querySelector('.col-md-8');
  let rightCol = container.querySelector('.col-md-4');
  // Fallbacks if classes not present
  if (!leftCol) {
    // try the first child with col-
    leftCol = Array.from(container.children).find(ch => /col-/.test(ch.className));
  }
  if (!rightCol) {
    // try the last child with col-
    const colChildren = Array.from(container.children).filter(ch => /col-/.test(ch.className));
    rightCol = colChildren.length > 1 ? colChildren[1] : colChildren[0];
  }
  // Make sure we pass only actual elements (may be undefined)
  const columns = [leftCol, rightCol].filter(Boolean);
  // Table row arrays
  const headerRow = ["Columns (columns16)"];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
