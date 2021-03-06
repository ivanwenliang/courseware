import { combineReducers } from "redux";
import courses from "./courses";
import lessons from "./lessons";
import app from "./app";
import user from "./user";

// Root reducer combines reducers and puts values into their respective keys
export default combineReducers({
  courses,
  lessons,
  app, // global store
  user
});
