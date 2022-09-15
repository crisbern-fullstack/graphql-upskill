const Category = {
  products: (parent, args, context) => {
    let filtered_products = context.products;
    const { filter } = args;
    const { id } = parent;

    //gets all products in the category
    filtered_products = context.products.filter(
      (product) => product.categoryId === id
    );

    //filters the relevant products
    if (args.filter) {
      if (filter.onSale) {
        filtered_products = filtered_products.filter(
          (product) => product.onSale
        );
      }
    }

    return filtered_products;

    // return context.products.filter((product) => product.categoryId === id);
  },
};

module.exports = { Category };
