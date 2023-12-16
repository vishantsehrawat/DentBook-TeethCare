import React from "react";
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer } from "./reducer/reducer";
import { thunk } from "redux-thunk";
const routeReducer = combineReducers({
  reducer,
});
export const store = legacy_createStore(routeReducer, applyMiddleware(thunk));
