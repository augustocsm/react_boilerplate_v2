import { combineReducers } from "redux";
import authService from "../services/auth/reducers";

export default combineReducers({
  session: authService,
});
