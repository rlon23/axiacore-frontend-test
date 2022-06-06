class ProductsList {
  constructor(name) {
    this.name = name;
    this.unfilteredList;
    this.filteredList;
    this.filters = [];
    this.getData();
  }

  getData() {
    fetch('./../products.json')
      .then((res) => res.json())
      .then((data) => (this.unfilteredList = data))
      .then(() => this.createHTML(this.unfilteredList));
  }

  set changeFilters(newFilter) {
    this.filters = newFilter;
  }

  get filtersLength() {
    return this.filters.length;
  }

  // create products list from data
  createHTML(data) {
    let emptyTemplate = document.getElementById('productsTemplate').innerHTML;
    let compiledTemplate = Handlebars.compile(emptyTemplate);
    let generatedHTML = compiledTemplate(data);
    let productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = generatedHTML;
  }

  filterProducts() {
    if (!this.filters.length) {
      //updates HTML content
      this.createHTML(this.unfilteredList);
    } else {
      let localData = this.unfilteredList.products.filter((item) =>
        this.filters.includes(item.filterId)
      );

      this.filteredList = {
        products: localData,
      };

      //updates HTML content
      this.createHTML(this.filteredList);
    }
  }
}

// new productList object
let productsList = new ProductsList('cervezas');

// gets filter modal button and close button
let filterModalToggle = document.querySelector('.filter-btn');
let filterCloseModal = document.querySelector('.close-modal');
let filterModalMenu = document.querySelector('.filter-modal');
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

//filter counter element
let filterAmountEl = document.getElementsByClassName('amount');
let filterAmountContainer = document.getElementsByClassName('filters');

function changeFilterAmount() {
  if (productsList.filtersLength == 0) {
    Array.from(filterAmountContainer).map((i) => (i.style.display = 'none'));
  } else {
    Array.from(filterAmountContainer).map((i) => (i.style.display = 'block'));
  }
  Array.from(filterAmountEl).map(
    (i) => (i.innerHTML = productsList.filtersLength)
  );
}

// checkboxes elements
let checkboxes = document.getElementsByClassName('input');

// add listeners to checkbox and adds filters to the array
Array.prototype.forEach.call(checkboxes, (elem) => {
  elem.addEventListener('change', () => {
    productsList.changeFilters = Array.from(checkboxes)
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
    changeFilterAmount();
  });
});

//button to apply filters
let filterApplyButton = document.querySelector('.filter-apply');

filterApplyButton.addEventListener('click', () => {
  productsList.filterProducts();
  toggleFilterModal();
});

//button to clear filters
let clearFiltersButton = document.querySelector('.filter-clear');

clearFiltersButton.addEventListener('click', () => {
  productsList.changeFilters = [];
  productsList.filterProducts();

  Array.prototype.forEach.call(checkboxes, (elem) => {
    elem.checked = false;
  });

  toggleFilterModal();
  changeFilterAmount();
});
