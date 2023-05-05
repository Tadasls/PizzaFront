import { post } from "../../api";

export const createSprint = (sprintData: unknown) => { post("/sprint", sprintData);}