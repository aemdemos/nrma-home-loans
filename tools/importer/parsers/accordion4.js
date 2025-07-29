/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Accordion (accordion4)'];
  const rows = [headerRow];

  // 2. Get all top-level accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach((item) => {
    // Get title from button > .item-title, else button text
    let title = '';
    const btn = item.querySelector('.c-accordion__header-button');
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = btn.textContent.trim();
      }
    }

    // Get content from .c-accordion__content__details, else .c-accordion__content
    let content = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      content = details;
    } else {
      const contentDiv = item.querySelector('.c-accordion__content');
      if (contentDiv) {
        content = contentDiv;
      }
    }

    // Only add if there is a title (avoid empty rows)
    if (title) {
      rows.push([title, content]);
    }
  });

  // 3. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
