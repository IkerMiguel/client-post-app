import { effect, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { empty, Observable, of } from 'rxjs';
import { Role, RoleResponse, User, UserResponse, UsersResponse } from '../interfaces/user.interface';

interface Options{
  limit?: number,
  page?: number,
}

const emptyUser: User = {
  id: 'new',
  first_name: '',
  last_name: '',
  email: '',
  telephone: '',
  avatar: 'avatar-user.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  Role: {} as Role,
};

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService{

  getUsers(options: Options): Observable<UsersResponse> {
    const { limit =4, page =1} = options;
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`, {params:{limit,page}});
  }
    getUser(id: string): Observable<UserResponse> {

      if(id === "new")
        return of({
          success: false,
          message: '',
          data:    emptyUser,
        });
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`)
  }

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiUrl}/roles`)
  }


  created(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  updated(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}`, data);
  }

  uploadAvatar(id: string, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', image);
    return this.http.put<string>(`${this.apiUrl}/users/avatar/${id}`, formData);
  }
}
