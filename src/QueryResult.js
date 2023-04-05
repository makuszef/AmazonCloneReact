import React, { useEffect, useState, createElement } from "react";
import "./QueryResult.css";
import { useParams } from "react-router-dom";
import QueryProduct from "./QueryProduct";
import { db } from "./firebase";
function QueryResult() {
  const { searchquery } = useParams();

  let lowersearch = searchquery.toLowerCase();
  lowersearch = lowersearch.trim();

  const [booksDetails, setBookDetails] = useState([]);
  let hiddendiv = document.getElementById("queryResult__hiddendiv");
  let h2elements = document.querySelectorAll("h2");
  console.log("clg", h2elements.item(0));

  useEffect(() => {
    //pull data from db
    db.collection("books").onSnapshot((snapshot) =>
      setBookDetails(
        snapshot.docs.map((doc) => ({
          docid: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  const items = [];
  for (const singlebook of booksDetails) {
    //check if query doesnt fit any books or authors
    if (
      singlebook.data.title.toLowerCase() !== lowersearch &&
      singlebook.data.author.toLowerCase() !== lowersearch
    ) {
      items.push(<h2>No such thing</h2>);
      hiddendiv.style.display = "block";
      break;
    }
  }
  return (
    <div className="queryResult">
      {booksDetails.map((singlebook) => {
        if (singlebook.data.title.toLowerCase() === lowersearch) {
          //display only items with specific name
          hiddendiv.style.display = "none";
          return (
            <QueryProduct
              id={singlebook.data.id}
              title={singlebook.data.title}
              image={singlebook.data.image}
              price={singlebook.data.price}
              rating={singlebook.data.rating}
              autor={singlebook.data.author}
            />
          );
        }
        if (singlebook.data.author.toLowerCase() === lowersearch) {
          //display every item with same author
          hiddendiv.style.display = "none";
          return (
            <QueryProduct
              id={singlebook.data.id}
              title={singlebook.data.title}
              image={singlebook.data.image}
              price={singlebook.data.price}
              rating={singlebook.data.rating}
              autor={singlebook.data.author}
            />
          );
        }
      })}

      {/*booksDetails.map((singlebook) => {
        if (
          singlebook.data.title.toLowerCase() !== lowersearch &&
          singlebook.data.author.toLowerCase() !== lowersearch
        ) {
          let node = document.createElement("h2"); // Create a <li> node

          let textnode = document.createTextNode(
            `No such thing: ${searchquery}`
          ); 
          node.appendChild(textnode); // Append the text to <li>
          hiddendiv.appendChild(node);
          hiddendiv.style.display = "block";
          break;
        }
      })*/}
      <div id="queryResult__hiddendiv" className="queryResult__hiddendiv">
        {items}
      </div>
    </div>
  );
}

export default QueryResult;
