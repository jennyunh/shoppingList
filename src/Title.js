import React from "react";
import { FaPencilAlt, FaSave} from "react-icons/fa";

function Title(props) {


    return(
        <>
        { props.editable ?             
        <div>
              <input className="bigInput" onKeyPress={(e) => props.onEnter(e)} 
              type="text" placeholder="Enter Title Here" onChange={props.onChange}
              id="bigInput"/> 

              <FaSave className="point save" onClick={props.handleTitle}/>
              </div>
            : 
            <h3 id="title" onClick={props.onClick}>

                <FaPencilAlt className="point" onClick={props.onClick}/>

                {props.title}
                </h3>
            }
            </>
    )
}

export default Title;