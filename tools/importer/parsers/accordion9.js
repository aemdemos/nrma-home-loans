/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by the block description
  const headerRow = ['Accordion (accordion9)'];
  const rows = [headerRow];

  // Find all direct accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title cell: extract the title from item-title span inside the button
    let title = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const titleSpan = button.querySelector('.item-title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }

    // Content cell: extract the .c-accordion__content__details node
    let content = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      content = details;
    } else {
      // fallback to the full content if details are missing
      const contentWrapper = item.querySelector('.c-accordion__content-wrapper');
      if (contentWrapper) {
        content = contentWrapper;
      } else {
        // fallback to any content region
        const contentRegion = item.querySelector('.c-accordion__content');
        if (contentRegion) {
          content = contentRegion;
        }
      }
    }

    // Ensure title and content are included even if one is empty (edge case)
    rows.push([title, content]);
  });

  // Create and replace with the new accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
