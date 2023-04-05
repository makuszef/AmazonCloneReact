import React from "react";
import "./QueryProduct.css";
import { useStateValue } from "./StateProvider";

function QueryProduct({ id, title, image, price, rating, autor }) {
  const [{ basket }, dispatch] = useStateValue(); //removing

  const addtoBasket = () => {
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
    <div className="queryProduct">
      <img src={image} alt="" className="queryProduct__image" />
      <div className="queryProduct__info">
        <p className="queryProduct__title">{title}</p>
        <p className="product__autor">
          <small>by | {autor}</small>
        </p>
        <p className="queryProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="queryProduct__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={addtoBasket}>Add to basket</button>
      </div>
    </div>
  );
}

export default QueryProduct;
