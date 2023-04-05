import React, { useState, useEffect, Children } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";

function Header() {
  const [{ basket, user }] = useStateValue();
  const [inputVal, setInputVal] = useState("");
  const history = useHistory();
  const [bookDetails, setBookDetails] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [firstsize, setFirstsize] = useState(true);

  let listofeveryting = [];
  const list = document.getElementById("list-group");
  //add event to whole list

  const [mylist, setMylist] = useState([]);
  const mydiv = document.getElementById("header__searchresults");
  const mybutton = document.getElementById("header__searchdiv");
  const myinput = document.getElementById("header__searchInput");

  //first coordinates
  if (firstsize && myinput) {
    let offsets1 = myinput.getBoundingClientRect();
    list.style.position = "absolute";
    //overwrite coordinates to new equals input width
    list.style.left = offsets1.left + "px";
    list.style.top = offsets1.top + offsets1.height + "px";
    list.style.width = offsets1.width + "px";
    setFirstsize(false);
  }
  //check for window resize
  window.addEventListener("resize", function () {
    console.log("resize");
    if (myinput) {
      //get coordinates
      var offsets = myinput.getBoundingClientRect();
      list.style.position = "absolute";
      //overwrite coordinates to new equals input width
      list.style.left = offsets.left + "px";
      list.style.top = offsets.top + offsets.height + "px";
      list.style.width = offsets.width + "px";
    }
  });

  /*function toLowwercasses(e) {
    let my_list = [];
    for (let i in e.length - 1) {
      my_list.push(e[i].toLowerCase());
    }
    return my_list;
  }*/
  /*if (list) {
    console.log("list");
    list.addEventListener("click", function (e) {
      console.log(e.target);
      if (e.target && e.target.nodeName == "LI") {
        setInputVal(e.target.innerText);
        console.log("TEXT", e.target.innerText);
      }
    });
  }*/

  function setList(group) {
    clearList();
    for (const somestring of group) {
      let node = document.createElement("LI"); // Create a <li> node

      node.className += "header__listelement"; //add classname
      let textnode = document.createTextNode(somestring); // Create a text node

      node.appendChild(textnode); // Append the text to <li>
      list.appendChild(node); // Append <li> to <ul>
    }
    if (group.length === 0) {
      setNoResults();
    }
  }
  function clearList() {
    while (list?.firstChild) {
      //clear list

      list.removeChild(list.firstChild);
    }
  }
  function setNoResults() {
    let node = document.createElement("LI"); // Create a <li> node

    let textnode = document.createTextNode("no results"); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    list.appendChild(node);
  }
  function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
      return 2;
    } else if (value.startsWith(searchTerm)) {
      return 1;
    } else if (value.includes(searchTerm)) {
      return 0;
    } else return -1;
  }
  function uniq(a) {
    //create uniq array
    return Array.from(new Set(a));
  }
  //pull values from db
  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) =>
      setBookDetails(
        snapshot.docs.map((doc) => ({
          author: doc.data().author,
          title: doc.data().title,
        }))
      )
    );
  }, []);
  useEffect(() => {
    bookDetails.map(
      ({ title, author }) => (
        listofeveryting.push(author), listofeveryting.push(title)
      )
    );
    let uniquelist = uniq(listofeveryting); //remove duplicates
    let arrayString = uniquelist.toString(); //convert to lowercases
    //let arrayLowerString = arrayString.toLowerCase();
    let arrayLower = arrayString.split(",");
    setMylist(arrayLower);
    //to lowers cases every string
  }, [bookDetails]);

  //input custom search
  useEffect(() => {
    let validinput = inputVal.trim().toLowerCase(); //bierz pod uwage tylko te które wliczają string
    if (validinput) {
      setList(
        mylist
          .filter((mystr) => {
            return mystr.toLowerCase().includes(validinput);
          })
          .sort((mystr1, mystr2) => {
            return (
              getRelevancy(mystr2.toLowerCase(), validinput) -
              getRelevancy(mystr1.toLowerCase(), validinput)
            ); //sort by relevancy
          })
      );
      list.style.display = "table";
    }
  }, [inputVal]);
  function onchangeblur() {
    list.style.display = "none";
    removeborder();
  }
  function changeborder() {
    if (mydiv) {
      mydiv.style.boxShadow = "0 0 2px 2px hsla(69, 80%, 46%, 0.5)";
    }
  }
  function removeborder() {
    if (mydiv) {
      mydiv.style.boxShadow = "none";
    }
  }

  /*let optionList = document.querySelectorAll(".header__listelement");
  useEffect(() => {
    optionList.forEach(function (el) {
      el.click = function () {
        console.log("object");
      };
    });
  }, [optionList]);*/

  /*useEffect(() => {
    optionList.forEach((o) => {
      o.addEventListener("click", () => {
        console.log(o);
        setInputVal(o.innerHTML);
      });
    });
  }, [optionList]);*/
  //push to history search value
  const search = (e) => {
    e.preventDefault();
    if (inputVal) {
      history.push(`/search/${inputVal}`);
    }
    setInputVal("");
  };
  const login = () => {
    if (user) {
      auth.signOut();
    }
  };
  function clickHandler(e) {
    // Getting an array of DOM elements
    // Then finding which element was clicked
    var nodes = Array.prototype.slice.call(e.currentTarget.children);
    var index = nodes.indexOf(e.target);
    console.log("clicked", e);
  }
  let wtf = document.querySelectorAll("li");
  wtf.forEach(
    (singleitem) =>
      singleitem.addEventListener("click", function (e) {
        console.log(e.target);
      })
    //singleitem.focus(function () {
    //  console.log("finally");
    //})
  );

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png"
          alt="amazonlogo"
          className="header__logo"
        />
      </Link>
      <form className="header__search">
        <div
          onClick={(e) => console.log(e.target)}
          className="header__searchresults"
          id="header__searchresults"
        >
          <input
            onChange={(e) => setInputVal(e.target.value)}
            value={inputVal}
            type="text"
            id="header__searchInput"
            className="header__searchInput"
            onBlur={() => onchangeblur()}
            onFocus={() => changeborder()}
          ></input>

          <div
            onClick={search}
            id="header__searchdiv"
            className="header__searchdiv"
          >
            <SearchIcon className="header__searchIcon" />
          </div>
        </div>

        <button
          onClick={search}
          className="header__searchbutton"
          type="submit"
        ></button>
      </form>
      <ul
        id="list-group"
        onClick={(e) => console.log(e.target)}
        className="list-group"
      ></ul>
      <div className="header__nav">
        <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header__option">
            <span className="header__optionLineOne">Hello {user?.email}</span>
            <span className="header__optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        {/*<Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
  </Link>*/}
        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineOne header__baksetCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
