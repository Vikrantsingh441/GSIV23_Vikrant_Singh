import React from "react";
import { Link ,useNavigate } from 'react-router-dom';
import"./nav.css"


interface topNavProps{
  Home:boolean;
  onclick:any;
  searchHandler:any;
}
const TopNavComp = (props:topNavProps) => {


  return (
    <>
<nav className="navbar bg-body-tertiary navTop">
  <div className="container-fluid">
    {props.Home? (<><div className="" role="search">
    <div className="input-group">
      <span className="input-group-text" id="basic-addon1">@</span>
      <input onChange={props.searchHandler} type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    </div></>):<div className="fs-3">Movie Detail</div>}
    <div onClick={props.onclick}>Home</div>
  </div>
</nav>
    </>
  );
};
export default TopNavComp;
