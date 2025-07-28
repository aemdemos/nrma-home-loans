/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per requirements
  const header = ['Cards (cardsNoImages12)'];
  const rows = [header];

  // Find all swiper-slide elements (one per card)
  const slides = element.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    // Each card is inside .c-product-selector__card
    const card = slide.querySelector('.c-product-selector__card');
    if (card) {
      // Create a container for this card
      const container = document.createElement('div');
      // For each visible section in card, append in order
      // Motivator (top label)
      const motivator = card.querySelector('.c-hl-motivator');
      if (motivator) container.appendChild(motivator);
      // Product details (heading and ul)
      const prod = card.querySelector('.c-product-selector__card__product');
      if (prod) container.appendChild(prod);
      // Rates (interest & comparison rates)
      const rates = card.querySelector('.c-product-selector__card__rates');
      if (rates) container.appendChild(rates);
      // Features (features list)
      const features = card.querySelector('.c-product-selector__card__features');
      if (features) container.appendChild(features);
      // Repayments section (heading, amount, notes, CTA)
      const repayments = card.querySelector('.c-product-selector__card__repayments');
      if (repayments) container.appendChild(repayments);
      // Add the container as a row
      rows.push([container]);
    }
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
