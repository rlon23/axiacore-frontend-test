const getData = () => {
  fetch('./../products.json')
    .then((res) => res.json())
    .then((data) => createHTML(data));
};

getData();

// create products list from data
const createHTML = (productsData) => {
  var emptyTemplate = document.getElementById('productsTemplate').innerHTML;
  var compiledTemplate = Handlebars.compile(emptyTemplate);
  var generatedHTML = compiledTemplate(productsData);
  var productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML = generatedHTML;
};

// +-+-+-+-

// gets filter modal button
let filterModalToggle = document.querySelector('.filter-btn');
let filterApplyButton = document.querySelector('.filter-apply');
let filterModalMenu = document.querySelector('.filter-modal');
let filterCloseModal = document.querySelector('.close-modal');
let productsUnfiltered = document.getElementsByClassName('product-card');
let bodyEl = document.body;

// onClick listener
filterModalToggle.addEventListener('click', toggleFilterModal);
filterCloseModal.addEventListener('click', toggleFilterModal);

function toggleFilterModal() {
  filterModalMenu.classList.toggle('modal-open');

  // disable body scroll
  if (filterModalMenu.classList.contains('modal-open')) {
    bodyEl.style.overflow = 'hidden';
  } else {
    bodyEl.style.overflow = 'auto';
  }
}

// checkboxes elements
let checkboxes = document.getElementsByClassName('input');

// filters array
let filters = [];

// add listeners to checkbox and adds filters to the array
Array.prototype.forEach.call(checkboxes, function (elem) {
  elem.addEventListener('change', function () {
    filters = Array.from(checkboxes)
      .filter((i) => i.checked)
      .map((i) => {
        if (i.id === 'rubia') {
          return 1;
        }
        if (i.id === 'morena') {
          return 2;
        }
        if (i.id === 'roja') {
          return 3;
        }
      });
    // console.log(filters);
  });
});

// add listener to filter apply button
filterApplyButton.addEventListener('click', applyFilters);

function applyFilters() {
  Array.prototype.forEach.call(productsUnfiltered, function (product) {
    if (!filters.length) {
      product.classList.remove('hide');
    }

    filters.forEach(function (entry) {
      if (product.classList.contains(entry)) {
        product.classList.remove('hide');
      } else {
        product.classList.add('hide');
      }
    });
  });

  toggleFilterModal();
}
