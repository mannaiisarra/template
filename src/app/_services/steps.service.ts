import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etape } from 'src/app/model/etape';
import { NameEtapes } from 'src/app/model/nameEtapes';


const API_URL = 'http://localhost:8082/etape';
@Injectable({
  providedIn: 'root'
})
export class StepsService {
  constructor(private http: HttpClient) { }

  removeEtape(id: string): Observable<DataResponseObject<Etape>> {
    return this.http.delete<DataResponseObject<Etape>>(API_URL + '/deletEtape/' + id);
  }

  getSteps(id:any): Observable<DataResponseObject<Etape>> {
    return this.http.get<DataResponseObject<Etape>>(API_URL+'/findById/'+id);
  }
  getEtapeByTheme(id:any): Observable<DataResponseObject<Etape>> {
    return this.http.get<DataResponseObject<Etape>>(API_URL+'/chercher/'+id);
  }

  updateSteps(id: string, data: any): Observable<DataResponseObject<Etape>> {
    return this.http.put<DataResponseObject<Etape>>(API_URL +'/updateTheme/'+ id, data);
  }
  // addUser(data: any): Observable<Dataresponse<Users>> {
  //   return this.http.post<Dataresponse<Users>>(API_URL, data);
  // }
  addSteps(data: any,theme_id:any): Observable<DataResponseObject<Etape>> {
    return this.http.post<DataResponseObject<Etape>>(API_URL + `/add/${theme_id}` , data);
  }


  getAllNameOfStapes(): Observable<DataResponseObject<NameEtapes>> {
    return this.http.get<DataResponseObject<NameEtapes>>(API_URL +'/nameofEtape');
  }

 
 
}
