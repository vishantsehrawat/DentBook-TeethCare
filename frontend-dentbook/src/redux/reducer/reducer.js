import { LOADING, SUCCESS, ERROR } from "../actionType/actionType";
const initialState = {
  isError: false,
  isLoading: false,
  data: [],
};
export const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, isLoading: false, isError: true };
    case SUCCESS:
      return { ...state, isLoading: false, data: payload };
    default:
      return state;
  }
};
