import React, { useEffect, useState } from 'react';
import { DetailPage, HomePage } from "../page";
import { Route, BrowserRouter as Router, Routes, useParams ,useNavigate} from 'react-router-dom';
import { TopNavComp } from '../component';
import { detailPage, getMovies, searchMovie } from '../libs/state-management/public.api';
import { useAppSelector ,useAppDispatch } from "../libs/state-management/hooks";
import { debug } from 'console';

function Main() {
  const { id } = useParams()
  const navigate = useNavigate()
  const Details = useAppSelector((state:any) => state.persistedReducer.movieDetail.detailPage);
  const Movie = useAppSelector((state:any) => state.persistedReducer.movies.searchMovie);
  const [showSearch,setShowSearch] = useState(!Details)
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(()=>{
console.log(Movie)
  },[Movie])

  const onHomeHandler = ()=>{
navigate("/")
dispatch(detailPage(false)as any)
setShowSearch(true)

  }

  useEffect(()=>{
if(id){
  dispatch(detailPage(true)as any)
  setShowSearch(false)
}else{
  dispatch(detailPage(false)as any)
  setShowSearch(true)
}
  },[])
  
  useEffect(()=>{
setShowSearch(!Details)
  },[Details])

  useEffect(() => {
    let debounceTimer:any;
    
    if (searchTerm) {
      debounceTimer = setTimeout(() => {
        dispatch(searchMovie({Keyword:searchTerm,Count:1}) as any)
      }, 500); 
    } else{
        dispatch(getMovies({Count:1}as any))
    }
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const onSearchHandler= (e:any)=>{
    setSearchTerm(e.target.value)
  }

  return (
    <>
        <TopNavComp Home={showSearch} onclick={onHomeHandler} searchHandler={onSearchHandler} ></TopNavComp>
    </>
  );
}

export default Main;
