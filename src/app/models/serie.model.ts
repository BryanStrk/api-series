export interface Serie {
    id?: number | string;
    _id?: string;
    title: string;
    channel: string;
    rating: number;
}
export interface CreateSeriePayload {
    title: string;
    channel: string;
    rating: number;
}