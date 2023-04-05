import React, { useState, useRef, useEffect } from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./Payment.css";
import PaymentProduct from "./PaymentProduct";
import { useStateValue } from "./StateProvider";
function Payment() {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [{ basket }] = useStateValue();
  const [products, setProducts] = useState([]);
  const [{}, dispatch] = useStateValue();

  let paypalRef = useRef();
  /*useEffect(() => {
    if (basket) {
      basket.map((item) =>
        setProducts({
          price: item.price,
          title: item.title,
          image: item.image,
          rating: item.rating,
          author: item.autor,
        })
      );
    }
  }, [basket]);*/
  let wholeprice = 0;
  useEffect(() => {
    for (const single of basket) {
      wholeprice += single.price;
    }
    console.log("price", wholeprice);
  }, [basket]);

  const product = {
    price: 70,
    description: "fancy chair",
    img:
      "https://cdn-lubimyczytac.pl/upload/books/74000/74555/574193-352x500.jpg",
  };
  useEffect(() => {
    if (paidFor) {
      console.log("should remove");
      dispatch({
        type: "CLEAR_BASKET",
      });
    }
  }, [paidFor]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARlkKpgR7qtup9sUT1ct4BTu3dBywGgI7fn1bj8zmnVMrNqwepWvWV3rt82e0_Wmy68SAQ5ZtG0Oaaxj";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);
    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "blue",
              shape: "pill",
              label: "paypal",
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "USD",
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onError: function (err) {
              // Show an error page here, when an error occurs
              alert("error has occured");
              console.log(err);
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
              if (order.status === "COMPLETED") setPaidFor(true);

              if (order.error === "INSTRUMENT_DECLINED") {
                return actions.restart();
              }
            },
          })
          .render(paypalRef);
      });
    }
  });
  return (
    <div>
      {paidFor ? (
        <div className="payment__completed">
          <h1>Transaction completed</h1>
          <CheckCircleOutlineIcon className="muiicon" />
        </div>
      ) : (
        <div>
          <div className="payment__items">
            {basket.map((singleitem) => (
              <PaymentProduct
                image={singleitem.image}
                title={singleitem.title}
                price={singleitem.price}
                rating={singleitem.rating}
                id={singleitem.id}
                autor={singleitem.autor}
              />
            ))}
          </div>
          <center>
            <div className="payment__paypal" ref={(v) => (paypalRef = v)} />
          </center>
        </div>
      )}
    </div>
  );
}

export default Payment;
