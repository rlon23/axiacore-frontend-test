let beers;

fetch('./../products.json')
  .then((res) => res.json())
  .then((data) => (beers = data))
  .then(() => console.log(beers));
