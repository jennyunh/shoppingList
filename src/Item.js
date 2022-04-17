import React from "react";
import { FaPencilAlt, FaTimes, FaSave } from "react-icons/fa";

function Item(props) {
  return (
    <div className="rowContainer">
      {/* If editable then show input element. Else, show the item name */}
      {props.editable ? (
          <div className="rowContainer">
        <input
        name="itemname"
        id={props.id}
          className="input"
          onKeyPress={(e) => props.onKeyPress(e, props.index)}
          onChange={props.nameChange}
          type="text"
          defaultValue={props.item.name}
        />

<input
          className="input"
          name="itemprice"
          id={props.id}
          onKeyPress={(e) => props.onKeyPress(e, props.index)}
          onChange={props.priceChange}
          type="text"
          defaultValue={props.item.price}
        />
        </div>
      ) : (
        <div className="rowContainer">
        <h3 className="item" onDoubleClick={props.editItem}>
          {props.item.name}
        </h3>

      {/* Item Price */}
      <h3 className="item" onDoubleClick={props.editItem}>
        ${props.item.price}{" "}
      </h3>
        </div>
      )}


      <div className="icons">

        {/* EDIT PENCIL ICON AND SAVE*/}
        {props.editable ? (
          <div className="point">
            <FaSave className="pencil" onClick={(e) => props.save(e, props.index)} />
          </div>
        ) : (
          <div className="point">
            <FaPencilAlt className="pencil" onClick={props.editItem} />
          </div>
        )}


        {/* DELETE ITEM ICON */}
        <div
          className="point"
          onClick={(e) => props.onDelete(e, props.index, props.id)}
        >
          <FaTimes className="cross" />
        </div>
      </div>




    </div>
  );
}

export default Item;
