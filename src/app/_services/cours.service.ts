import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours  } from 'src/app/model/cours';

const API_URL = 'http://localhost:8082/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }


  addCours(data: any): Observable<DataResponseObject<Cours>> {
    return this.http.post<DataResponseObject<Cours>>(API_URL +`/add`, data);
  }

}
