import { Role } from "@roles/interfaces/roles.interface";

export interface UsersResponse {
    success: boolean;
    message: string;
    data:    Data;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data:    User;
}

export interface Data {
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
    users:       User[];
}

export interface User {
    id:         string;
    first_name: string;
    last_name:  string;
    email:      string;
    telephone:  string;
    avatar:     string;
    createdAt:  Date;
    updatedAt:  Date;
    Role?:       Role;
    role_id?:   string;
    auth?: boolean;
}



