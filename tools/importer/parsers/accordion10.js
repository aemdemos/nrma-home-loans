/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as required by block definition
  const header = ['Accordion (accordion10)'];

  // Get all direct accordion item children
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  const rows = [header];

  items.forEach(item => {
    // TITLE: Get the title from the button > .item-title span, preserving semantic meaning (wrap in <p> for clarity)
    let titleText = '';
    const btn = item.querySelector('h3 button');
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span && span.textContent) {
        titleText = span.textContent.trim();
      } else {
        titleText = btn.textContent.trim();
      }
    }
    const titleEl = document.createElement('p');
    titleEl.textContent = titleText;

    // CONTENT: Try to find .c-accordion__content__details for the main content
    let content = item.querySelector('.c-accordion__content__details');
    if (!content) {
      // fallback: use .c-accordion__content
      content = item.querySelector('.c-accordion__content');
    }
    if (!content) {
      // fallback: use first .c-accordion__content-wrapper
      content = item.querySelector('.c-accordion__content-wrapper');
    }
    if (!content) {
      // fallback: empty div if absolutely nothing found
      content = document.createElement('div');
    }
    // Always reference the existing element (do not clone)
    rows.push([titleEl, content]);
  });

  // Create and replace with the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
