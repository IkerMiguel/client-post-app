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
}

export interface Role {
    id:   string;
    name: string;
}

export interface RoleResponse {
    success: boolean;
    message: string;
    data:    Role[];
}

export interface Role {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}


