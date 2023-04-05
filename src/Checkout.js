import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          alt=""
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />
        {basket?.length === 0 ? (
          <div>
            <h2>Your basket is empty</h2>
          </div>
        ) : (
          //else

          <div style={{ position: "relative" }}>
            <h2 className="checkout__title">Your Shopping Basket</h2>{" "}
            {/**add flip move */}
            <FlipMove>
              {basket?.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  autor={item.autor}
                  key={item.id}
                />
              ))}
            </FlipMove>
          </div>
        )}
      </div>
      {basket?.length > 0 && (
        <div className="checkout__rigth">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
