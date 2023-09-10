import React,{useEffect, useState}from "react";
import { detailPage, getMovies } from "../libs/state-management/public.api";
import { CardComp} from "../component";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"
import {
    useAppSelector,
    useAppDispatch,
  } from "../libs/state-management/hooks";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useAppSelector((state:any) => state.persistedReducer.movies.getMovies);
    const SearchData = useAppSelector((state:any) => state.persistedReducer.movies.searchMovie);
    const [cardData,SetCardData] = useState<any[]>([])
    const [timerId, setTimerId] = useState<number | null>(null);
    const [pageCount,setPageCount] = useState(1)
    const [searchPageCount,setSearchPageCount] = useState(1)


    useEffect(()=>{
        dispatch(getMovies({Count:pageCount}) as any)
    },[])

    useEffect(()=>{
     const tempData = data?.results?.map((item:any)=>{
        return {
            key:item.id,
            shortDesc:item.overview,
            rating :item.vote_average,
            title:item.title,
            imageUrl:`https://www.themoviedb.org/t/p/w260_and_h390_bestv2/${item.poster_path}`,
            releaseDate:item.release_date
        }
     })
     if(data?.page==1){
      SetCardData(tempData)
     }else if((data?.page>1)){
      extraData()
     }

    },[data.results])

    const extraData = ()=>{
      const tempData = data?.results?.map((item:any)=>{
        return {
            key:item.id,
            shortDesc:item.overview,
            rating :item.vote_average,
            title:item.title,
            imageUrl:`https://www.themoviedb.org/t/p/w260_and_h390_bestv2/${item.poster_path}`,
            releaseDate:item.release_date
        }
     })
      SetCardData((prevCardData) => [...prevCardData, ...tempData])
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }, []);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
  
      if (windowHeight + scrollTop >= documentHeight - 10 ) {

        setPageCount((prevPageCount) => prevPageCount + 1);
        // const newTimerId = setTimeout(() => {dispatch(getMovies({Count:pageCount+1}) as any)} ,1000);
        // setTimerId(newTimerId as any);
        
      }
      
    };

    useEffect(()=>{
      if (pageCount > 1) {
        const newTimerId = setTimeout(() => {
          dispatch(getMovies({ Count: pageCount }) as any);
        }, 1000);
    
        setTimerId(newTimerId as any);
      }

    },[pageCount])

    useEffect(()=>{
      const tempData = SearchData?.results?.map((item:any)=>{
         return {
             key:item.id,
             shortDesc:item.overview,
             rating :item.vote_average,
             title:item.title,
             imageUrl:`https://www.themoviedb.org/t/p/w260_and_h390_bestv2/${item.poster_path}`,
             releaseDate:item.release_date
         }
      })
      SetCardData(tempData)
     },[SearchData])



    const movieSelectHandler = (id:string)=>{
      dispatch(detailPage(true)as any)
        navigate(`/detail/${id}`);
    }

  return (
    <>
      <div className="row p-3 page">
        {cardData.map((data: any) => {
          return (
            <>
              <div  key={data.key} className="col-sm-4 col-xsm-6 cards px-1 mb-2">
                <CardComp
                  id={data.key}
                  imageUrl={data.imageUrl}
                  title={data.title}
                  desc={data.shortDesc}
                  rating={data.rating}
                  onclick={movieSelectHandler}
                ></CardComp>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default HomePage;
