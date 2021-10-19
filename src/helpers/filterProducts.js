const filterProducts = (products, selectedCategory, isPendingProducts) => {
  let filteredList = [...products];

  if (
    selectedCategory !== null &&
    selectedCategory.trim() !== 'hepsi' &&
    !isPendingProducts &&
    products
  ) {
    filteredList = products.filter(
      (product) => product.category.title.trim() === selectedCategory.trim()
    );
  }
  if (
    (selectedCategory === 'hepsi' || selectedCategory === null) &&
    !isPendingProducts &&
    products
  ) {
    filteredList = products;
  }
  return filteredList;
};

export default filterProducts;
