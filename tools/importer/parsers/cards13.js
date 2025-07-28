/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card containers (columns)
  const cardCols = element.querySelectorAll(':scope > div');
  const headerRow = ['Cards'];
  const rows = [];

  cardCols.forEach((col) => {
    // Find the icon or image in the card (first cell)
    let iconOrImage = null;
    // FontAwesome <i> icon
    const iconWrapper = col.querySelector('.icon-wrapper');
    if (iconWrapper) {
      const icon = iconWrapper.querySelector('i');
      if (icon) {
        iconOrImage = icon;
      }
    }
    // Fallback for images (not present in this HTML, but future-proof)
    if (!iconOrImage) {
      const img = col.querySelector('img');
      if (img) {
        iconOrImage = img;
      }
    }
    // If no icon or image, leave cell empty

    // Build text content (second cell)
    const contentParts = [];
    // Heading (keep heading tag for semantic meaning)
    const heading = col.querySelector('.c-card--product__heading');
    if (heading) {
      contentParts.push(heading);
    }
    // Description (include <p> for semantic meaning)
    const desc = col.querySelector('.c-card--product__description');
    if (desc) {
      // Could contain only a <p>, or could be empty
      Array.from(desc.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          contentParts.push(node);
        }
      });
    }
    // CTA Button (keep as <a> for semantics)
    const cta = col.querySelector('.c-button-wrapper-stack a');
    if (cta) {
      contentParts.push(cta);
    }
    // If contentParts is empty, push an empty string
    let cellContent = contentParts.length > 1 ? contentParts : (contentParts[0] || '');
    rows.push([iconOrImage || '', cellContent]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
