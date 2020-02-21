export interface WorkerFilteredData {
    filteredData: {
        lat: number;
        lng: number;
        userData: any;
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