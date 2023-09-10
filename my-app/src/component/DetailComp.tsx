import React, { useEffect, useState } from "react";
import "./detail.css"

interface DetailComp {
Detail:any;
  }

const DetailComp = (props:DetailComp) => {
    const [detail,setDetail] = useState<any>({})

    useEffect(()=>{
console.log(props.Detail?.cast)
setDetail(props.Detail)
    },[props.Detail])
const actors = props.Detail?.cast?.filter((item:any)=>(item)).join(",")

  return <>
  <div className="container-fluid detailPage">
  <div className="row">
    <div className="col-md-4">
    <img src={`https://www.themoviedb.org/t/p/w260_and_h390_bestv2/${detail?.detail?.imageUrl}`} className="card-img-top movieImage" alt="..." /> </div>
        <div className="col-md-8">
            <div className="col-md-12">
<span className="detailTitle">{detail?.detail?.title}  </span>              <span className="ms-2 rating">{detail?.detail?.rating != "0" ?detail?.detail?.rating : "N/A" }</span>
            </div>
            <div className="col-md-12">
<span className="info me-2">{detail?.detail?.releaseDate}</span>|<span className="info ms-2 me-2">{detail?.detail?.runtime}</span>|<span className="info ms-2 me-2">{detail?.director}</span>
            </div>
            <div className="col-md-12 mt-1 mb-2 actor">
{actors?.length>=40 ? `${actors.substring(0,40)}...` : `${actors}`}
            </div>
            <div className="col-md-12">
<span className="me-2 fw-medium">Description:</span>{detail?.detail?.desc}
            </div>

        </div>
        </div>
  </div>
  </>;
};
export default DetailComp;
