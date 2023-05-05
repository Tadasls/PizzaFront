import { User } from './userReducer';
import {AppDispatch} from "../store";

export enum UserActionTypes {
  GET_CURRENT_USER = 'user/getCurrentUser',
  GET_CURRENT_USER_SUCCESS = 'user/getCurrentUserSuccess',
}

const getCurrentUserAction = () => ({
  type: UserActionTypes.GET_CURRENT_USER,
});

const getCurrentUserSuccessAction = (user: User) => ({
  type: UserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getCurrentUserAction());

    fetch('https://jsonplaceholder.typicode.com/users/1').then(
      async (result) => {
        const resultJson = await result.json();

        dispatch(getCurrentUserSuccessAction(resultJson));
      },
    );
  };
};
