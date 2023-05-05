import { PayloadAction } from '@reduxjs/toolkit';
import { UserActionTypes } from './userActions';

//User is example data, remove and remake when implementing real data according to the task at hand

export interface User {
  name: string;
  email: string;
  isPro: boolean;
  username: string;
  phone: string;
  website?: string;
  company?: string;
  id: number;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export interface UserState extends User {
  isFetching: boolean;
  randomItem: string;
  loaded?: boolean;
}

const defaultUserState: UserState = {
  name: 'John Doe',
  randomItem: 'randomItem',
  email: 'example@user.com',
  isPro: false,
  isFetching: true,
  username: 'johndoe',
  id: 0,
  phone: '123456789',
};

const userReducer = (
  state: UserState = defaultUserState,
  action: PayloadAction<Partial<UserState>, UserActionTypes>,
) => {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER:
      return { ...state, loaded: false };
    case UserActionTypes.GET_CURRENT_USER_SUCCESS:
      return { ...state, loaded: true, ...action.payload, isFetching: false };
    default:
      return state;
  }
};

export default userReducer;
