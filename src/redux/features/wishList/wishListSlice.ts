import type { Product } from "@/types/types";
import {  createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice= createSlice({

  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action : PayloadAction<Product>) => {

        const exists = state.items.find(p => p.id === action.payload.id)

        if(!exists){
            state.items.push(action.payload)
        }

    },

    removeFormWishlist: (state, action: PayloadAction<number>) =>{

        state.items = state.items.filter(p => p.id !== action.payload)
    },


  }

})

export const {addToWishlist, removeFormWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;