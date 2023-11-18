function filterProducts(priceRange) {

  var productCards = document.querySelectorAll('.custom-card');

  productCards.forEach(function(card) {
    var priceElement = card.querySelector('p b');
    var price = parseInt(priceElement.innerText.replace(/\D/g, ''));

    switch (priceRange) {
      case 'duoi10k':
        card.style.display = price < 10000000 ? 'block' : 'none';
        break;
      case '10k-20k':
        card.style.display = price >= 10000000 && price < 20000000 ? 'block' : 'none';
        break;
      case '20k-30k':
        card.style.display = price >= 20000000 && price < 30000000 ? 'block' : 'none';
        break;
      case '30k-40k':
        card.style.display = price >= 30000000 && price < 40000000 ? 'block' : 'none';
        break;
      case '40k-50k':
        card.style.display = price >= 40000000 && price < 50000000 ? 'block' : 'none';
        break;
      case 'all':
        card.style.display = 'block';
        break;
      default:
        card.style.display = 'none';
    }
  });
}