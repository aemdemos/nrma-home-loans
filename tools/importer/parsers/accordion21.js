/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name exactly
  const cells = [
    ['Accordion (accordion21)']
  ];

  // Each accordion item
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title (always mandatory): find '.item-title' span
    let titleCell = '';
    const itemTitle = item.querySelector('.c-accordion__header-button .item-title');
    if (itemTitle) {
      // Use the span element directly to preserve formatting
      titleCell = itemTitle;
    }
    
    // Content (mandatory): Prefer .c-accordion__content__details, fallback to .c-accordion__content
    let contentCell = '';
    let contentDetails = item.querySelector('.c-accordion__content__details');
    if (contentDetails) {
      contentCell = contentDetails;
    } else {
      const contentFallback = item.querySelector('.c-accordion__content');
      if (contentFallback) contentCell = contentFallback;
    }
    // If no content is found, set as empty fragment
    if (!contentCell) {
      contentCell = document.createDocumentFragment();
    }

    cells.push([
      titleCell,
      contentCell
    ]);
  });

  // Create the accordion block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
