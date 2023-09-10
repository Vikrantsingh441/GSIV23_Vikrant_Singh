import { createSlice, createAsyncThunk, createAction, PayloadAction } from '@reduxjs/toolkit'; 


export const getMovieDetails = createAsyncThunk(
      'movieDetail/getMovieDetails',
      async ({
        id,
    }:{
        id?: string,
    }) => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
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

    
    export const detailPage = createAction<any>("movieDetail/detailPage");

    export const getMovieCredits = createAsyncThunk(
      'movieDetail/getMovieCredits',
      async ({
        id,
    }:{
        id?: string,
    }) => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
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




export interface movieDetail {
  loading: boolean;
  error: any;
  getMovieDetails:any;
  getMovieCredits:any;
  detailPage:boolean;
};


const initialState: movieDetail = {
  loading: false,
  error: {},
  detailPage:false,
  getMovieDetails:{},
  getMovieCredits:{}
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {detailPage: (state: any, action: PayloadAction<any>) => {
    state.detailPage = action.payload;
  },},
  extraReducers: (builder:any) => {
      builder.addCase(getMovieDetails.pending, (state:any) => {
        state.loading = true;
      });

      builder.addCase(getMovieDetails.fulfilled, (state: { loading: boolean; error: string; getMovieDetails: any; }, action: { payload: any; }) => {
        state.loading = false;
        state.error = "";
        state.getMovieDetails = action.payload 
      });

      builder.addCase(getMovieDetails.rejected,(state: { loading: boolean; error: any; }, action: { error: any; })=>{
        state.loading =false;
        state.error = action.error
      });


      builder.addCase(getMovieCredits.pending, (state:any) => {
        state.loading = true;
      });

      builder.addCase(getMovieCredits.fulfilled, (state: { loading: boolean; error: string; getMovieCredits: any; }, action: { payload: any; }) => {
        state.loading = false;
        state.error = "";
        state.getMovieCredits = action.payload 
      });

      builder.addCase(getMovieCredits.rejected,(state: { loading: boolean; error: any; }, action: { error: any; })=>{
        state.loading =false;
        state.error = action.error
      })

  },
});

export default movieDetailSlice.reducer;