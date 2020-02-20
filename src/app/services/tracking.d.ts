export interface WorkerFilteredData {
    filteredData: {
        lat: number;
        lng: number;
        userData: any;
    };
    removedUsers: number[];
    newUsers: number[];
}