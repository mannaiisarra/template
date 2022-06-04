import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/model/demande';


const API_URL = 'http://localhost:8082/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  removeDemande(id: string): Observable<DataResponseObject<Demande>> {
    return this.http.delete<DataResponseObject<Demande>>(API_URL + '/deleteDemande/' + id);
  }

  getDemandeById(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL+'/findById/'+id);
  }


  addDemande(data: any,formationn_id:any,users_id:any): Observable<DataResponseObject<Demande>> {
    return this.http.post<DataResponseObject<Demande>>(API_URL + `/add/${formationn_id}/${users_id}` , data);
  }
  getAllDemande(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +'/');
  }

  updateDemande(id: string, data: any): Observable<DataResponseObject<Demande>> {
    return this.http.put<DataResponseObject<Demande>>(API_URL +'/updateDemande/'+ id, data);
  }

}