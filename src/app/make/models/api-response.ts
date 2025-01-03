export interface ApiResponse<T> {
    Count: number;
    Message: string;
    SearchCriteria: string | null;
    Results: T[];
}
