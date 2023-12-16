import React from "react";
import axios from "axios";
import { ERROR, LOADING, SUCCESS } from "../redux/actionType/actionType";

const searchApiUrl = "https://fakestoreapi.com/products";
const searchHomepageApi = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const response = await axios.get(searchApiUrl);
    console.log(response.data);
    dispatch({ type: SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: ERROR });
    return error;
  }
};

export default searchHomepageApi;
