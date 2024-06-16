import { reducerCases } from "./constants";

export const initialState = {
  userName: "",
  userEmail: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    case reducerCases.SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail,
      };
    default:
      return state;
  }
};

export default reducer;
