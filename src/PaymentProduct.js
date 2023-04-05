import React from "react";
import "./PaymentProduct.css";

function Product({ id, title, rating, image, price, autor }) {
  return (
    <div className="payment__product">
      <div className="product__info">
        <p>
          <strong>{title}</strong>
        </p>
        <p className="product__autor">
          <small>by | {autor}</small>
        </p>
        <p className="product__price">
          <strong>${price}</strong>
        </p>
      </div>
      <img src={image} alt="" />
    </div>
  );
}

export default Product;
