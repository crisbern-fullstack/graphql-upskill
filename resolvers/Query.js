const Query = {
  products: (parent, args, context) => {
    let filtered_products = context.products;
    const { filter } = args;
    const { reviews } = context;

    if (args.filter) {
      const { onSale, avgRating } = args.filter;
      //on sale filter
      if (onSale) {
        filtered_products = filtered_products.filter(
          (product) => product.onSale
        );
      }

      //avg rating filter
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filtered_products = filtered_products.filter((product) => {
          let sumRating = 0;
          let numReviews = 0;

          reviews.filter((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numReviews++;
            }
          });

          const averageRating = parseInt(sumRating / numReviews);

          console.log(product.name, averageRating);

          return avgRating <= averageRating;
        });
      }
    }

    return filtered_products;
  },
  product: (parent, args, context) => {
    const productId = args.id;

    const product = context.products.find(
      (product) => product.id === productId
    );

    return product ? product : null;
  },
  categories: (parent, args, context) => context.categories,
  category: (parent, args, context) => {
    const categoryId = args.id;

    const category = context.categories.find(
      (category) => categoryId === category.id
    );

    return category ? category : null;
  },
};

module.exports = { Query };
