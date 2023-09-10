import React from "react";
import "./card.css";

interface CardCompInterface {
  imageUrl: string;
  title: string;
  desc: string;
  rating: string;
  onclick:any;
  id:string;
}

const CardComp = (props: CardCompInterface) => {
  return (
    <div key={props.id}>  
      <div className="card" key={props.id} onClick={()=>{props.onclick(props.id)}}>
        <img src={props.imageUrl} className="card-img-top cardMovieImage" alt="Poster N/A" />
        <div className="card-body cardHeight px-2">
          <div className="d-flex justify-content-between">
            <div>
            <h1 className="card-title title">{props.title.length > 12 ? `${props.title.substring(0, 12)+"..."}`:`${props.title}`}</h1>
            </div>
          <div>{props.rating != "0" ? props.rating : "N/A"}</div>
          </div>
          
          <p className="card-text textDesc">{props.desc.length > 36 ? `${props.desc.substring(0, 36)+"..."}`:`${props.desc}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComp;
