/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header: it must match the block name exactly.
  const rows = [['Accordion (accordion6)']];

  // Find all accordion items (immediate children with class c-accordion__item)
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach((item) => {
    // Title cell: the .item-title span inside the button
    let titleContent = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const titleSpan = button.querySelector('.item-title');
      if (titleSpan) {
        titleContent = titleSpan;
      } else {
        // fallback to whole button if span missing
        titleContent = button;
      }
    }

    // Content cell: the .c-accordion__content__details div, or fallback to wrapper/content if missing
    let contentCell = '';
    let contentDetails = item.querySelector('.c-accordion__content__details');
    if (!contentDetails) {
      // fallback: look for content region
      const contentRegion = item.querySelector('.c-accordion__content');
      if (contentRegion) {
        // Use everything inside .c-accordion__content
        contentCell = contentRegion;
      } else {
        // fallback: the wrapper, or empty
        const wrapper = item.querySelector('.c-accordion__content-wrapper');
        contentCell = wrapper || '';
      }
    } else {
      contentCell = contentDetails;
    }

    // Push the row for this accordion item
    rows.push([titleContent, contentCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
