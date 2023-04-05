import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Home.css";
import Product from "./Product";
function Home() {
  let mynumbers = [];
  const [bookDetails, setBookDetails] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) =>
      setBookDetails(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      )
    );
  }, []);

  let nah = [0, 0, 0];

  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt="image2"
      />
      <div className="home__row">
        {counter < 3 &&
          nah.forEach((singleobj) => {
            setCounter(counter + 1);
            mynumbers.push(Math.floor(Math.random() * bookDetails.length));
            console.log(mynumbers);
            /*return (
              <Product
                image={bookDetails[mynumbers.length - 1].image}
                title={bookDetails[mynumbers.length - 1].title}
                price={bookDetails[mynumbers.length - 1].price}
                rating={bookDetails[mynumbers.length - 1].rating}
                id={bookDetails[mynumbers.length - 1].id}
                autor={bookDetails[mynumbers.length - 1].author}
              />
            );*/
          })}
      </div>
      <div className="home__row">
        <Product
          image="https://cdn-lubimyczytac.pl/upload/books/241000/241181/338839-352x500.jpg"
          title="1984"
          price={11.2}
          rating={4}
          id={12312}
          autor="George Orwell"
        ></Product>
        <Product
          image="https://a.allegroimg.com/original/11f1ae/c47428954faab4db4775ae3bb8c5"
          title="Zew Cthulhu"
          price={20}
          rating={5}
          id={22331}
          autor="H.P. Lovecraft"
        ></Product>
        <Product
          image="https://cdn-lubimyczytac.pl/upload/books/74000/74555/574193-352x500.jpg"
          title="Nowy wspaniały świat"
          price={7}
          rating={4}
          id={323232}
          autor="Aldous Huxley"
        />
      </div>
      <div className="home__row">
        <Product
          image="https://ecsmedia.pl/c/uniwersum-metro-2033-metro-2035-b-iext34526587.jpg"
          title="Metro 2035"
          price={18}
          rating={5}
          id={454545}
          autor="Dmitry Glukhovsky"
        />
      </div>
    </div>
  );
}

export default Home;
