import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, rating, image, price, autor }) {

  let hiddendiv = document.getElementById('product__hiddendiv');
  const [{ basket }, dispatch] = useStateValue();
  const handlemouseover = (e) => {
    let mydiv = document.getElementById('product__hiddendiv');
    let x = e.clientX;
    let y = e.clientY;
    mydiv.style.display = "block";
    mydiv.style.left = x + 'px';
    mydiv.style.top = y + 'px';
    console.log(x, y)
    let offsets = document.getElementById('product__hiddendiv').getBoundingClientRect();
    console.log('offset', offsets.top);
    console.log('offset', offsets.left);
  }
  const hidediv = (e) => {
    let mydiv = document.getElementById('product__hiddendiv');
    mydiv.style.display = "none";
  }
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        autor: autor,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__hiddendiv" id="product__hiddendiv">buy me</div>
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
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} onMouseOut={hidediv} onMouseMoveCapture={handlemouseover} alt="" />
      <button type="button" onClick={addToBasket} className="product__button">
        Add to basket
      </button>
    </div>
  );
}

export default Product;
