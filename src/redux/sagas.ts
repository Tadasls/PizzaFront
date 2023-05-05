import { all } from 'redux-saga/effects';
import  newSprintSaga  from './NewSprint/NewSprint.sagas';

export default function* rootSaga() {
    yield all([
        newSprintSaga()
    ]);
}