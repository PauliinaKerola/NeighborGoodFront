import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './items.service';

export type Address = {
  id: number;
  street: string;
  zipCode: string;
  city: string;
};
export type Profile = {
  address: Address;
  lastName: string;
  auth0Id: string;
  firstName: string;
  id: number;
  items: Item[];
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  imageUrl: string;
};
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<Profile>(`${apiUrl}/Profiles`);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/Profiles/${userId}`);
  }

  getUserById(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${apiUrl}/${userId}`);
  }

  addUser(user: any): Observable<Profile> {
    return this.http.post<Profile>(apiUrl, user, HttpOptions);
  }

  updateUser(profile: Profile, formData: FormData): Observable<any> {
    return this.http.put(`${apiUrl}/${profile.id}`, formData);
  }

  deleteUser(id: number): Observable<Profile> {
    console.log('delete', id);
    return this.http.delete<Profile>(`${apiUrl}/${id}`);
  }
}
const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const apiUrl = 'https://neighborgood.azurewebsites.net/api';
