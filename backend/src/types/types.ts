export interface User {
    name: string;
    email: string;
}

export type ServiceResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string };
