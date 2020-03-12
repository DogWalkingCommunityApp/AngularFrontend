import { IUserData } from "./data";

export interface WorkerFilteredData {
    filteredData: {
        lat: number;
        lng: number;
        userData: IUserData;
    };
    removedUsers: number[];
    newUsers: number[];
    jump: boolean;
}

export interface IWorkerMessage {
    type: string;
    data?: WorkerFilteredData;
    heading?: any;
}