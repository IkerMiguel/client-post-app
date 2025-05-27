export interface RolesResponse {
    success: boolean;
    message: string;
    data:    Data;
}

export interface RoleResponse {
    success: boolean;
    message: string;
    data:    Role;
}

export interface Data {
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
    roles:       Role[];
}

export interface Role {
    id:        string;
    name:      string;
    createdAt?: Date;
    updatedAt?: Date;
}
