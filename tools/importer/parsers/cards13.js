/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name, exactly as specified
  const headerRow = ['Cards (cards13)'];

  // Get all immediate card containers (1 card per col)
  const cardEls = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cardEls.map(cardEl => {
    // Icon or Image cell (may be an icon-wrapper with an <i> icon)
    let iconCell = '';
    const iconWrapper = cardEl.querySelector('.icon-wrapper');
    if (iconWrapper) {
      iconCell = iconWrapper;
    }

    // Text content cell
    const textParts = [];

    // Title (as heading)
    const heading = cardEl.querySelector('.c-card--product__heading');
    if (heading) textParts.push(heading);

    // Description
    const desc = cardEl.querySelector('.c-card--product__description');
    if (desc) textParts.push(desc);

    // CTA (button/link)
    const ctaWrapper = cardEl.querySelector('.c-button-wrapper-stack');
    if (ctaWrapper) textParts.push(ctaWrapper);

    // Use array of elements as cell content
    return [iconCell, textParts];
  });

  // Compose and insert block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
