const getData = () => {
  fetch('./../products.json')
    .then((res) => res.json())
    .then((data) => createHTML(data));
};

const createHTML = (productsData) => {
  var emptyTemplate = document.getElementById('productsTemplate').innerHTML;
  var compiledTemplate = Handlebars.compile(emptyTemplate);
  var generatedHTML = compiledTemplate(productsData);
  var productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML = generatedHTML;
};

getData();
