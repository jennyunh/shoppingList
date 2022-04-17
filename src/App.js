/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import "./App.scss";
import { useState, useEffect } from "react";
import Item from "./Item.js";
import Title from "./Title";
import Total from "./Total";

/*INITIAL STATE VALUES */
const initialList = [
  {
    name: "apple",
    price: 2,
    id: "default1",
  },

  {
    name: "milk",
    price: 3.0,
    id: "default2",
  },
];

const initialPrice = 0;
const blankArray = [];
const initialTitle = "Click to Name List";
const regex = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

function App() {
  /*------------------ */
  /*    STATE HOOKS    */
  /*------------------ */
  const [totalVal, setTotal] = useState(0);
  const [list, setList] = useState(initialList);
  const [editItem, setEditItem] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  //Keeps track of the item name and price input boxes (above additem button).
  const [inputName, setinputName] = useState("");
  const [inputPrice, setinputPrice] = useState("");

  //Tracks the item's input boxes after clicking edit.
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(initialPrice);
  const [inputTitle, setinputTitle] = useState("");
  const [error, setError] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);

  //After dom updates 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    //calculate total price when DOM updates
    totalPrice();

    //check if the big title input is null (null when it doesnt exist on DOM)
    //if the big title input exists, focus on it immediately

    let bigInput = document.getElementById("bigInput");

    if (bigInput) {
      console.log("biginput ezists");
      bigInput.focus();
    }


    //focus on price input immediately when clicking on it after error msg
    let noErrorInput = document.getElementById("itemPrice2");
if ((noErrorInput) && (errorHappened)) {
  noErrorInput.focus();
  setErrorHappened(false);
}

  });

  //Calculates the total price
  function totalPrice() {
    let total = 0;
    list.map((ele) => {
      total += ele.price;
    });
    let roundedTotalStr = parseFloat(total).toFixed(2);
    let roundedTotal = parseFloat(roundedTotalStr);
    setTotal(roundedTotal);
    return roundedTotal;
  }


  /*--------------------------------- */
  /*   UPDATE INPUT VALUE TO STATE    */
  /*--------------------------------- */
  /*Whenever you edit title in the input field, save the input value into the inputTitle state */
  function updateInputTitle(e) {
    setinputTitle(e.target.value);
    console.log("TITLE input changed " + inputTitle);
  }

  //Save input value of "item name" input (above additem button) to the state inputname.
  function updateInputName(e) {
    setinputName(e.target.value);
  }

  //Save the input value of "price" input (above add item button) to the state inputprice.
  function updateInputPrice(e) {
    let priceStr = e.target.value;

    //If price is a number, there is no error.
    if (priceStr === "" || regex.test(priceStr)) {
      setError(false);
      setinputPrice(parseFloat(priceStr));
      console.log("inputPrice parsed is " + parseFloat(priceStr));
    }
    //price is not a number so ERROR
    else {
      setError(true);
      setErrorHappened(true);
    }
  }

  //When item's name input value changes, update the NewName state.
  function updateNewName(e) {
    setNewName(e.target.value);
    console.log("input changed " + newName);
  }

  //item's price input value updated to the NewPrice state.
  function updateNewPrice(e) {
    let priceStr = e.target.value;

    //If price is a number, there is no error.
    if (regex.test(priceStr)) {
      setError(false);
      setNewPrice(parseFloat(priceStr));
      console.log("inputNEWPrice parsed is " + parseFloat(priceStr));
    } else {
      setError(true);
      setErrorHappened(true);
    }
  }



  /*----------------------*/
  /*----ITEM FUNCTIONS----*/
  /*----------------------*/

  /*ADD, REMOVE, OR CLEAR ITEMS */
  function addItem(e, ind) {
    let copyList = [...list];
    let obj = {};
    obj.name = inputName;

    if (error === false) {
      obj.price = inputPrice;
      obj.id = inputName + copyList.length;
      copyList.push(obj);
      setList(copyList);
    } else {
      console.log("ERROR fo real");
    }
  }

  function enterItem(e) {
    if (e.key === "Enter") {
      let copyList = [...list];
      let obj = {};
      obj.name = inputName;

      if (error === false) {
        obj.price = inputPrice;
        obj.id = inputName + copyList.length;
        copyList.push(obj);
        setList(copyList);
      } else {
        console.log("ERROR fo real ");
      }
    }
  }

  function removeItem(e, ind) {
    const newList = list.filter((el) => {
      return el.id !== list[ind].id;
    });
    setList(newList);
  }

  function clearItems() {
    setList(blankArray);
    setinputPrice(0);
    setinputName("");
    setNewName("");
    setNewPrice(0);
    let nameinput = document.getElementById("itemName");
    let priceinput = document.getElementById("itemPrice2");
    nameinput.value = "";
    priceinput.value = 0;
  }

  /* EDIT ITEM BUTTON CLICKED*/
  function handleEdit() {
    setEditItem(!editItem);
  }

  /*SAVE ITEM*/
  function saveItem(e, ind) {
    setEditItem(!editItem);
    let copyList = [...list];
    copyList[ind].name = newName;
    copyList[ind].price = newPrice;
  }

  /*ENTER FOR ITEM NAME*/
  function handleKey(e, ind) {
    if (e.key === "Enter") {
      setEditItem(!editItem);
      let copyList = [...list];
      copyList[ind].name = newName;
      copyList[ind].price = newPrice;
    }
  }

  /*----------------------*/
  /*----TITLE FUNCTIONS----*/
  /*----------------------*/
  /*ENTER FOR TITLE*/
  function handleEnter(e) {
    if (e.key === "Enter") {
      setEditTitle(!editTitle);
      setTitle(e.target.value);
    }
  }

  /*EDIT TITLE CLICKED*/
  function editTitleMode(e) {
    setEditTitle(!editTitle);

  }

  /*SAVE TITLE*/
  function handleTitle(e) {
    setEditTitle(!editTitle);
    setTitle(inputTitle);
  }

  /*RENDER */
  return (
    <div className="App">
      <Title
        editable={editTitle}
        title={title}
        onClick={editTitleMode}
        onEnter={handleEnter}
        onChange={updateInputTitle}
        handleTitle={handleTitle}
      ></Title>

      {/* ITEM NAME INPUT */}
      <div className="inputs">
        <input
          type="text"
          id="itemName"
          onChange={updateInputName}
          placeholder="Item Name"
          onKeyPress={(e) => enterItem(e)}
        />

        {/* ITEM PRICE INPUT */}
        {error ? (
          <div className="errorInput">
            <input
              className="bounceIt"
              onClick={() => {
                setError(false);
              }}
              type="text"
              id="itemPrice"
              onChange={updateInputPrice}
              placeholder="Item Price 0.00"
              onKeyPress={(e) => enterItem(e)}
            />

            <div className="errorMsg">ERROR: Invalid (Numbers Only)</div>
          </div>
        ) : (
          <input
            type="text"
            id="itemPrice2"
            onChange={updateInputPrice}
            placeholder="Item Price 0.00"
            onKeyPress={(e) => enterItem(e)}
          />
        )}
      </div>
      <br></br>

      <div className="buttons">
        <button type="submit" value="submit" onClick={addItem}>
          Add Item
        </button>

        <button type="submit" value="clear" onClick={clearItems}>
          Clear
        </button>
      </div>

      {list.map((el, i) => {
        return (
          <Item
            onKeyPress={handleKey}
            editItem={handleEdit}
            save={saveItem}
            editable={editItem}
            key={el.name + i}
            id={el.id}
            index={i}
            item={el}
            onDelete={removeItem}
            onAdd={addItem}
            nameChange={updateNewName}
            priceChange={updateNewPrice}
          ></Item>
        );
      })}

      <Total totalprop={totalVal}></Total>
    </div>
  );
}

export default App;
