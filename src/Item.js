import { React, useState, useRef, createRef, useEffect}  from "react";
import { FaPencilAlt, FaTimes, FaSave, FaList } from "react-icons/fa";

function Item(props) {


  return (
    <div className="rowContainer">
      {/* If editable then show input element. Else, show the item name */}
      {((props.editable) && (props.clicked === props.id)) ? (
        <div className="rowContainer">
          <input
            name="itemname"
            id={props.id}
            className="input"
            onKeyPress={(e) => props.onKeyPress(e, props.index)}
            onChange={props.nameChange}
            onClick={props.nameChange}
            type="text"
            defaultValue={props.item.name}
          />

          <input
            className="input"
            name="itemprice"
            id={props.id}
            onKeyPress={(e) => props.onKeyPress(e, props.index)}
            onChange={props.priceChange}
            onClick={(e) => props.priceChange(e)}
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
        {(props.editable)  && (props.clicked === props.id) ? (
          <div className="point">
            <FaSave
              className="pencil"
              id={props.id}
              onClick={(e) => props.save(e, props.index, props.id)}
            />
          </div>
        ) : (
          <div className="point">
            <FaPencilAlt className="pencil" onClick={(e) => props.editItem(e, props.index, props.id)} />
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
    
  )
  }


export default Item;
