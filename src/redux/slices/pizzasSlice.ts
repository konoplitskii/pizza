import { CartItem } from './cartSlice';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type } from 'os';
import { Sort } from './filterSlice';


type Pizza = {
  id:string, 
  title:string, 
  price:number, 
  imageUrl:string,
  sizes:number[], 
  types:number[]
}

enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success"
}


interface pizzaSliceState {
  items:Pizza[];
  status:Status
}

type FetchPizzasArgs = {
  order:string, 
  sortBy:string, 
  category:string, 
  search:string, 
  currentPage:string, 
}

export type SearchPizzaParams = { 
  order:string,
  sortBy:string,
  category:string,
  search:string,
  currentPage:string 
}

type FetchPizzasArgsR = Record<string,string>

const initialState:pizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading,error,succes
};

// First, create the thunk
export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://627deaaeb75a25d3f3ae2170.mockapi.io/items?page=${currentPage}&limit=${4}&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);


// export const fetchPizzas = createAsyncThunk(
//   'pizza/fetchPizzasStatus',
//   async (params:FetchPizzasArgsR) => {
//     const { order, sortBy, category, search, currentPage } = params;
//     const { data } = await axios.get(
//       `https://627deaaeb75a25d3f3ae2170.mockapi.io/items?page=${currentPage}&limit=${4}&${category}&sortBy=${sortBy}&order=${order}${search}`,
//     );
//     return data as CartItem[];
//   },
// );

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
      state.items = [];
    },
  },
// use ts
  extraReducers:(builder)=> {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }

  // use no ts
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
