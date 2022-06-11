import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export enum sortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string,
  sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
  categoryID: number,
  currentPage: number,
  sort: Sort
}

 const initialState:FilterSliceState = {
  categoryID: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: sortPropertyEnum.RATING_DESC
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryID = action.payload;
    },
    setSort(state,  action:PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state,  action:PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryID = Number(action.payload.categoryID);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryID = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: sortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
