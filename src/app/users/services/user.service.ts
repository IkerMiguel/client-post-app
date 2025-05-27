import { effect, Injectable,inject } from '@angular/core';
import { BaseHttpService } from '@shared/services/base-http.service';
import { empty, Observable, of, tap } from 'rxjs';
import {
  User,
  UserResponse,
  UsersResponse,
} from '../interfaces/user.interface';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '@roles/interfaces/roles.interface';
import { Options } from '@shared/interfaces/shared.interfaces';

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


  authService = inject(AuthService);
  router = inject(Router)

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

  deletedUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`).pipe(tap(() => this.removeIfSameUser(id)));

  }

  removeIfSameUser(id: string) {
    const storedUser = localStorage.getItem('user');
      if(storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if(parsedUser.id === id) {
          this.authService.logout();

          Swal.fire({
                    position: "center",
                    icon: 'info',
                    title: "Te eliminaron la cuenta, Te desconectaron",
                    showConfirmButton: false,
                    timer: 1500
                  });
        this.router.navigate(['/auth/login']);
      }else{
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok"
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
      }
    }
  }



  uploadAvatar(id: string, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', image);
    return this.http.put<string>(`${this.apiUrl}/users/avatar/${id}`, formData);
  }
}
