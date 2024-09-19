import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: {product.price} $</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
