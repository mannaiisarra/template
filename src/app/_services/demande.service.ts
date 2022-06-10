import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/model/demande';
import { Formation } from 'src/app/model/formation';

const API_URL = 'http://localhost:8082/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  removeDemande(id: string): Observable<DataResponseObject<Demande>> {
    return this.http.delete<DataResponseObject<Demande>>(API_URL + '/delateDemande/' + id);
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
  getformationAjouter(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/all/${id}`);
  } 
  
  getActive(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/active/${id}/true`);
  }  
  getActiveNot(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/active/${id}/false`);
  }  

  getNotActive(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/Notactive/False`);
  } 

  getDemandetActive(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/Notactive/True`);
  } 

  getUserByDemande(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL+'/findById/'+id);
  }
  updatedemandee(id: string, data: any): Observable<DataResponseObject<Demande>> {
    return this.http.put<DataResponseObject<Demande>>(API_URL +`/updateFormation/${id}`, data);
  } 

  getAll(): Observable<DataResponseObject<Formation>> {
    return this.http.get<DataResponseObject<Formation>>(API_URL +`/Allformation`);
  }

}