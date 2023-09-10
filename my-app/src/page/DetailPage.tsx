import React, { useEffect, useState } from "react";
import { DetailComp } from "../component";
import { useParams } from 'react-router-dom';
import { useAppSelector ,useAppDispatch } from "../libs/state-management/hooks";
import { detailPage, getMovieCredits, getMovieDetails } from "../libs/state-management/public.api";

const DetailPage = ()=>{
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const data = useAppSelector((state:any) => state.persistedReducer.movieDetail);
    const [detail,setdetail] = useState({})

    useEffect(()=>{
        if(id){
          dispatch(detailPage(true)as any)
        }else{
          dispatch(detailPage(false)as any)
        }
          },[])
    useEffect(()=>{
       dispatch(getMovieDetails({id:id}))
       dispatch(getMovieCredits({id:id}))

     },[])

    useEffect(()=>{
        const tempDetail = {
                title:data.getMovieDetails.title,
                desc:data.getMovieDetails.overview,
                imageUrl:data.getMovieDetails.poster_path,
                runtime:data.getMovieDetails.runtime,
                releaseDate:data.getMovieDetails.release_date,
                rating:data.getMovieDetails.vote_average,
            }
        const tempCast = data.getMovieCredits?.cast?.map((item:any)=>{
            return{
                actorName:item?.name
            }
        })
        const tempDirector = data.getMovieCredits?.crew?.filter((item:any)=>(item.job=="Director"))[0]?.name
        setdetail({detail:tempDetail,cast:[tempCast[0]?.actorName,tempCast[1]?.actorName,tempCast[2]?.actorName],director:tempDirector})

    },[data.getMovieCredits,data.getMovieDetails])




    return(<>
    <DetailComp Detail={detail}></DetailComp>
</>)
}
export default DetailPage