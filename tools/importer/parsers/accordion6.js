/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const rows = [['Accordion (accordion6)']];

  // Find immediate accordion item children
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  items.forEach((item) => {
    // Title: The <span class="item-title"> inside the button in h3
    let title = '';
    const titleBtn = item.querySelector('h3 .c-accordion__header-button .item-title');
    if (titleBtn) {
      title = titleBtn.textContent.trim();
    } else {
      // Fallback: button text or h3 text
      const btn = item.querySelector('h3 button');
      if (btn) {
        title = btn.textContent.trim();
      } else {
        const h3 = item.querySelector('h3');
        if (h3) {
          title = h3.textContent.trim();
        }
      }
    }

    // Content: grab the content details if present, fallback to .c-accordion__content
    let content = null;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      content = details;
    } else {
      const accContent = item.querySelector('.c-accordion__content');
      if (accContent) {
        content = accContent;
      } else {
        // fallback: entire content wrapper if nothing else
        const wrapper = item.querySelector('.c-accordion__content-wrapper');
        if (wrapper) content = wrapper;
      }
    }

    // Add a row for this accordion item
    rows.push([title, content]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
