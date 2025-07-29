/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as specified
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  // Get all accordion items (direct children)
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // --- TITLE EXTRACTION ---
    // The title should be the inner text of .item-title in the button
    let title = '';
    // Find the button with class .c-accordion__header-button
    const button = item.querySelector('button.c-accordion__header-button');
    if (button) {
      // Find the .item-title span inside button
      const span = button.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        // fallback: use button's own text
        title = button.textContent.trim();
      }
    } else {
      // fallback: grab h3 text if structure changes
      const h3 = item.querySelector('h3');
      if (h3) title = h3.textContent.trim();
    }
    // --- CONTENT EXTRACTION ---
    // Try to get the content details div (rich content)
    let contentEl = item.querySelector('.c-accordion__content__details');
    // fallback: whole .c-accordion__content
    if (!contentEl) {
      contentEl = item.querySelector('.c-accordion__content');
    }
    // fallback: wrapper (shouldn't happen, but for max resilience)
    if (!contentEl) {
      contentEl = item.querySelector('.c-accordion__content-wrapper');
    }
    // fallback: empty string
    let contentCell = '';
    if (contentEl) {
      contentCell = contentEl;
    }
    // --- PUSH ROW: always [title, contentCell] ---
    rows.push([title, contentCell]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
