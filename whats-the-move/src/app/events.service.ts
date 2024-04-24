// src/app/eventbrite.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventbriteService {
  private baseUrl = 'https://www.eventbriteapi.com/v3/'; // Base URL for Eventbrite API
  private apiKey = 'BAUOW33EMWKQ4BXT267R'; // Replace with your Eventbrite API key

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    const params = {
      'token': this.apiKey,
      'location.address': 'Chapel Hill',
      'location.within': '10mi'
    }
    return this.http.get(this.baseUrl, { params });
  }
}
