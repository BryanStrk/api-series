import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie, CreateSeriePayload } from '../models/serie.model';

@Injectable({ providedIn: 'root' })
export class SeriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://peticiones.online/api/series';

  getAll(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl);
  }

  create(payload: CreateSeriePayload): Observable<Serie> {
    return this.http.post<Serie>(this.baseUrl, payload);
  }
}
