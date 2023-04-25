import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>(apiUrl, reservation, httpOptions);
  }

  getReservations(itemId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ReservationByItemId/${itemId}`);
  }

  getItemsReservedByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ItemsReservedByUser/${userId}`);
  }

  getItemsReservedFromUser(userId: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ItemsReservedFromUser/${userId}`);
  }

  cancelReservation(resId: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${resId}`);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
const apiUrl = "https://localhost:7009/api/reservations";