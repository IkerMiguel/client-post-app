import { effect, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { empty, Observable, of, tap } from 'rxjs';
import {
  Role,
  RoleResponse,
  User,
  UserResponse,
  UsersResponse,
} from '../interfaces/user.interface';

interface Options {
  limit?: number;
  page?: number;
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
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  private userCache = new Map<string, UserResponse>();
  private usersCache = new Map<string, UsersResponse>();
  private rolesCache = new Map<string, RoleResponse>();

  getUsers(options: Options): Observable<UsersResponse> {
    const { limit = 4, page = 1 } = options;

    const key = `users-${page}-${limit}`;

    if (this.usersCache.has(key)) {
      return of(this.usersCache.get(key)!);
    }

    return this.http
      .get<UsersResponse>(`${this.apiUrl}/users`, {
        params: { limit, page },
      })
      .pipe(tap((resp) => this.usersCache.set(key, resp)));
  }

  getUser(id: string): Observable<UserResponse> {
    if (id === 'new')
      return of({
        success: false,
        message: '',
        data: emptyUser,
      });

      if (this.userCache.has(id)) {
        return of(this.userCache.get(id)!);
      }

      return this.http
        .get<UserResponse>(`${this.apiUrl}/users/${id}`)
        .pipe(tap((resp) => this.userCache.set(id, resp)));
  }

  getRoles(): Observable<RoleResponse> {
    if (this.rolesCache.has('roles')) {
      return of(this.rolesCache.get('roles')!);
    }

    return this.http
       .get<RoleResponse>(`${this.apiUrl}/roles`)
       .pipe(tap((resp) => this.rolesCache.set('roles', resp)));
  }

  created(data: any): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.apiUrl}/users`, data)
      .pipe(tap((resp) => this.addUserToCache(resp)));
  }

  updated(id: string, data: any): Observable<UserResponse> {
    return this.http
      .patch<UserResponse>(`${this.apiUrl}/users/${id}`, data)
      .pipe(tap((resp) => this.updateUserCache(id, data)));
  }

  addUserToCache(userResponse: UserResponse){
    if(!userResponse.data.id) return;

    this.userCache.set(userResponse.data.id, userResponse);

    this.usersCache.forEach((usersResponse) => {
      usersResponse.data.users = [
        userResponse.data,
        ...usersResponse.data.users,
      ];
    });
  }

  updateUserCache(id: any, user: any){
    user.id = id;
    const data: UserResponse = {
      success : true,
      message : '',
      data : user
    }

    this.userCache.set(id, data);

    this.usersCache.forEach((userResponse) =>{
      userResponse.data.users = userResponse.data.users.map((currentUser) =>
        currentUser.id === id ? user : currentUser,
      );
    });
  }

  uploadAvatar(id: string, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', image);
    return this.http.put<string>(`${this.apiUrl}/users/avatar/${id}`, formData);
  }
}
