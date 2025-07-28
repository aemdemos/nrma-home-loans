/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container inside the provided element
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = Array.from(accordion.querySelectorAll(':scope > .c-accordion__item'));
  
  // Prepare rows
  const rows = [['Accordion (accordion8)']];
  
  items.forEach(item => {
    // Title cell: get the button > span.item-title
    let title = '';
    const btn = item.querySelector('button.c-accordion__header-button');
    if (btn) {
      // Use the span.item-title if present, else fallback to the button itself
      const span = btn.querySelector('.item-title');
      if (span) {
        title = span;
      } else {
        title = btn;
      }
    }
    // Content cell: get the accordion content details
    let contentCell = '';
    const contentDetails = item.querySelector('.c-accordion__content__details');
    if (contentDetails) {
      contentCell = contentDetails;
    } else {
      // fallback to .c-accordion__content or .c-accordion__content-wrapper
      const mainContent = item.querySelector('.c-accordion__content');
      if (mainContent) {
        contentCell = mainContent;
      } else {
        const contentWrap = item.querySelector('.c-accordion__content-wrapper');
        if (contentWrap) {
          contentCell = contentWrap;
        }
      }
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the accordion container with the table
  accordion.parentNode.replaceChild(table, accordion);
}
