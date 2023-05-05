import { combineReducers } from 'redux';
import userReducer from '../redux/user/userReducer';
import newSprintReducer from "./NewSprint/NewSprintReducer";

const reducers = combineReducers({ user: userReducer, newSprint: newSprintReducer });

export default reducers;
