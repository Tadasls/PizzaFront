import produce from 'immer';
import * as actions from './NewSprintActionType';
import { Member, TaskData } from '../../types/NewSprintTypes';


export type NewSprint = {
  sprint: {
    title: string;
    startDate: string | null;
    endDate: string | null;
    tasks: TaskData[];
    memberTeamId: string | null;
    members: Member[];
  };
};
const initialState: NewSprint = {
  sprint: {
    title: '',
    startDate: null,
    endDate: null,
    tasks: [],
    memberTeamId: null,
    members: [],
  },
};

// @ts-ignore
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_TASK:
      return produce(state, (draftState) => {
        draftState.sprint.tasks.push(payload);
      });
    case actions.REMOVE_TASK:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex(
          (o) => o.id === payload,
        );
        draftState.sprint.tasks.splice(index, 1);
      });
    default:
      return state;
  }
};
export default reducer;



