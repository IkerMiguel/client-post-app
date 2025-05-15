import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

protected http = inject(HttpClient);
protected apiUrl = environment.apiURL	; // Replace with your API URL
}
