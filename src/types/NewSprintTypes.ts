export type Sprint = {
    [id: string]: any;
    title: string;
    startDate: string;
    endDate: string;
    tasks: Task[];
    members: Member[];
}

export type Task = {
    keyValue: string;
    keyColor: string;
    description: string;
    type: string;
    oldPoints: number;
    remainingPoints: number;
    newPoints: number;
};

export type MemberWorkingDay = {
    day: string;
    task: Task;
};

export type Member = {
    firstName: string;
    lastName: string;
    memberId: string;
    workingDays: MemberWorkingDay[];
};

export type TaskData = {
    id: number;
    keyValue: string;
    keyColor: string;
    description: string;
    type: string;
    oldPoints: number;
    remainingPoints: number;
    newPoints: number;
}