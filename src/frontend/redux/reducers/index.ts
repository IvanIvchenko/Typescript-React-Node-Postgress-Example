import { combineReducers } from "redux";
import superheroesReducer from "./superheroesSlice"

const reducers = combineReducers({
  superheroes: superheroesReducer
});

export default reducers;