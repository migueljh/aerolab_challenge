import {
  GET_PRODUCTS_DETAILS,
  GET_USER_INFO,
  ADD_POINTS
} from "./types";

const initialState = {
  products: [],
  user: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_DETAILS:
      return {
        ...state,
        products: action.products,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.user,
      };
    case ADD_POINTS:
      return {
        ...state,
        user:  {...state.user},
      };
    default:
      return state;
  }
}
