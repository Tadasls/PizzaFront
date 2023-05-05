import * as actions from './NewSprintActionType';

export const createNewSprint = (sprintData: any) => ({
  type: actions.CREATE_NEW_SPRINT,
  payload: sprintData,
});
