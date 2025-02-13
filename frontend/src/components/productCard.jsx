import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition-all">
      <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-lg" />
      <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
      <p className="text-gray-700 text-lg font-medium mt-1">${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg mt-4 w-full transition-all">
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired, 
};

export default ProductCard;
