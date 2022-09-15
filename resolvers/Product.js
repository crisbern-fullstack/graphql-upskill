const Product = {
  category: (parent, args, context) => {
    const { categoryId } = parent;

    return context.categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, args, context) => {
    const { id } = parent;

    return context.reviews.filter((review) => review.productId === id);
  },
};

module.exports = { Product };
