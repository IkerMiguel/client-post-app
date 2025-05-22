import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { empty, Observable, of } from 'rxjs';
import { User, UserResponse, UsersResponse } from '../interfaces/user.interface';

const emptyUser: UserResponse = {
      success: false,
      message: '',
      data: {} as User,
}
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService{

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`)
  }
    getUser(id: string): Observable<UserResponse> {

      if(id === "new") return of(emptyUser); 
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`)
  }
}
