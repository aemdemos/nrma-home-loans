/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find .c-free-text__content inside the section
  const contentSection = element.querySelector('.c-free-text__content');

  // Defensive: If not found, do nothing
  if (!contentSection) return;

  // 2. Extract the heading (title)
  let title = contentSection.querySelector('h1, h2, h3, h4, h5, h6');

  // 3. Extract the paragraphs (subheading and possible CTA)
  // All <p> children (in order)
  const paragraphs = Array.from(contentSection.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);

  // 4. Find CTA (<a>), if any, that is not already captured by the paragraph
  let cta = null;
  paragraphs.forEach(p => {
    const possibleCta = p.querySelector('a');
    if (possibleCta && !cta) {
      cta = possibleCta;
    }
  });
  if (!cta) {
    // Look for any remaining <a>
    cta = contentSection.querySelector('a');
  }

  // 5. Build the content cell for row 3: title, subheading, CTA
  const contentCell = [];
  if (title) contentCell.push(title);
  if (paragraphs.length > 0) {
    contentCell.push(...paragraphs);
  }
  // Only push CTA if it's not already visually present in the paragraphs
  if (cta && !contentCell.some(e => e.contains && e.contains(cta))) {
    contentCell.push(cta);
  }

  // 6. Hero table: header, background image (none), content
  const cells = [
    ['Hero'],
    [''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
