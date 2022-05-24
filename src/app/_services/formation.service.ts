import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation  } from 'src/app/model/formation';

const API_URL = 'http://localhost:8082/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<DataResponseObject<Formation>> {
   return this.http.get<DataResponseObject<Formation>>(API_URL +`/`);
 }
 addFormation(data: any): Observable<DataResponseObject<Formation>> {
   return this.http.post<DataResponseObject<Formation>>(API_URL + '/add', data);
 }
 removeFormation(id: string): Observable<DataResponseObject<Formation>> {
   return this.http.delete<DataResponseObject<Formation>>(API_URL + '/deleteFormation/' + id);
 }

 getFormationbyId(id:any): Observable<DataResponseObject<Formation>> {
   return this.http.get<DataResponseObject<Formation>>(API_URL+'/findById/'+id);
 }
 updateUser(id: string, data: any): Observable<DataResponseObject<Formation>> {
   return this.http.put<DataResponseObject<Formation>>(API_URL +'/updateUser/'+ id, data);
 }


}