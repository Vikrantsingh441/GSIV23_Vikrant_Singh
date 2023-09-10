import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 


export const getMovies = createAsyncThunk(
      'movies/getMovies',
      async ({
        Count,
    }:{
        Count?: number,
    }) => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${Count}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTU3ZTcyNzZhMTJhMjZkYTIxY2I2MTg4ODc4NGFlMiIsInN1YiI6IjY0ZjJhZTFlNzQ1MDdkMDExYzFlYmYzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._WNgDcAKw9tKze8bnxOy1AEzdhFFft3Ul_yOVxSFu4g',
              'accept': 'application/json',
            },
          });
          const data = await response.json();
          return data;
      }
    );

export const searchMovie = createAsyncThunk(
      'movies/searchMovie',
      async ({Keyword,Count}:{
        Keyword:string,Count: number,
    }) => {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${Keyword}&include_adult=false&language=en-US&page=${Count}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTU3ZTcyNzZhMTJhMjZkYTIxY2I2MTg4ODc4NGFlMiIsInN1YiI6IjY0ZjJhZTFlNzQ1MDdkMDExYzFlYmYzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._WNgDcAKw9tKze8bnxOy1AEzdhFFft3Ul_yOVxSFu4g',
              'accept': 'application/json',
            },
          });
          const data = await response.json();
          return data;
      }
    );

export interface movieListState {
  loading: boolean;
  error: any;
  getMovies:any;
  searchMovie:any;
};


const initialState: movieListState = {
  loading: false,
  error: {},
  getMovies:{},
  searchMovie:{},
};

const movielistSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {

      builder.addCase(getMovies.pending, (state:any) => {
        state.loading = true;
      });

      builder.addCase(getMovies.fulfilled, (state: { loading: boolean; error: string; getMovies: any; }, action: { payload: any; }) => {
        state.loading = false;
        state.error = "";
        state.getMovies = action.payload 
      });

      builder.addCase(getMovies.rejected,(state: { loading: boolean; error: any; }, action: { error: any; })=>{
        state.loading =false;
        state.error = action.error
      })






      builder.addCase(searchMovie.pending, (state:any) => {
        state.loading = true;
      });

      builder.addCase(searchMovie.fulfilled, (state: { loading: boolean; error: string; searchMovie: any; }, action: { payload: any; }) => {
        state.loading = false;
        state.error = "";
        state.searchMovie = action.payload 
      });

      builder.addCase(searchMovie.rejected,(state: { loading: boolean; error: any; }, action: { error: any; })=>{
        state.loading =false;
        state.error = action.error
      })




  },
});

export default movielistSlice.reducer;