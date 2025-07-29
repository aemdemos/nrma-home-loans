/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Cards (cards12)
  const rows = [['Cards (cards12)']];

  // Find all swiper slides (cards)
  const slides = element.querySelectorAll('.swiper-slide.c-carousel__swiper-slide');

  slides.forEach((slide) => {
    // Find card root
    const card = slide.querySelector('.c-product-selector__card');
    if (!card) return;
    // 1st cell: image/icon (not present)
    const imgCell = '';
    // 2nd cell: content block
    // Reference existing child elements to retain semantics
    const cellContent = [];
    const motivator = card.querySelector(':scope > div > .c-hl-motivator');
    if (motivator) cellContent.push(motivator);
    const product = card.querySelector(':scope > div > .c-product-selector__card__product');
    if (product) cellContent.push(product);
    const rates = card.querySelector(':scope > div > .c-product-selector__card__rates');
    if (rates) cellContent.push(rates);
    const features = card.querySelector('.c-product-selector__card__features');
    if (features) cellContent.push(features);
    const repayments = card.querySelector('.c-product-selector__card__repayments');
    if (repayments) cellContent.push(repayments);
    rows.push([imgCell, cellContent]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}