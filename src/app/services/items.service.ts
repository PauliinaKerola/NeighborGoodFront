import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type Item = {
  id: number;
  name: string;
  ownerId: number;
  description: string | null;
  isBorrowed: boolean;
  rating: number;
  imageUrl: string | null;
  addInfo: string | null;
  borrowTime: string | null;
  itemAdded: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  searchResults = new Subject();

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getUsersItems(userId: number) {
    return this.http.get<Item[]>(`${apiUrl}/user/${userId}`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  addItem(tool: FormData): Observable<any> {
    return this.http.post<FormData>(apiUrl, tool);
  }

  getResults(searchTerm: string): Observable<any> {
    return this.http.get(`${apiUrl}/searchByName/${searchTerm}`);
  }

  getExtendedSearchResults(
    searchTermExt: string,
    category: string,
    city: string
  ): Observable<any> {
    const searchParams = new URLSearchParams();
    searchParams.set('name', searchTermExt);
    searchParams.set('city', city);
    searchParams.set('category', category);
    return this.http.get(`${apiUrl}/searchExtended?${searchParams.toString()}`);
  }

  getCities(): Observable<any> {
    return this.http.get(`${apiUrl}/cities`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${apiUrl}/categories`);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }

  updateItem(id: number, item: FormData) {
    return this.http.put<any>(`${apiUrl}/${id}`, item);
  }

  reserveItem(id:number, status: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/reserve/${id}`, status);
  }
}

const apiUrl: string = 'https://neighborgood.azurewebsites.net/api/Items';
