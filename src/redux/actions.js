import axios from "axios";
import {
  getProductsDetails,
  getUserData,
  TOKEN,
  addUserPoints,
  purchaseProduct,
} from "./types";

export const getProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("https://coding-challenge-api.aerolab.co/products", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      .then((products) => {
        dispatch(getProductsDetails(products.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    return await axios
      .get("https://coding-challenge-api.aerolab.co/user/me", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      .then((user) => {
        dispatch(getUserData(user.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addPoints = (amount) => {
  return async (dispatch) => {
    try {
      await axios.post(
        "https://coding-challenge-api.aerolab.co/user/points",
        { amount },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      dispatch(addUserPoints(amount));
    } catch (error) {
      console.log("error post", error);
    }
  };
};

export const buyProduct = (productId) => {
  return async (dispatch) => {
    return await axios
      .post(
        "https://coding-challenge-api.aerolab.co/redeem",
        { productId },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      )
      .then((redeem) => {
        dispatch(purchaseProduct(redeem.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};
