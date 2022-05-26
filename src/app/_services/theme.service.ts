
import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/model/theme';


const API_URL = 'http://localhost:8082/theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  removeTheme(id: string): Observable<DataResponseObject<Theme>> {
    return this.http.delete<DataResponseObject<Theme>>(API_URL + '/deleteTheme/' + id);
  }

  getThemeById(id:any): Observable<DataResponseObject<Theme>> {
    return this.http.get<DataResponseObject<Theme>>(API_URL+'/findById/'+id);
  }

  updateTheme(id: string, data: any): Observable<DataResponseObject<Theme>> {
    return this.http.put<DataResponseObject<Theme>>(API_URL +'/updateTheme/'+ id, data);
  }
  // addUser(data: any): Observable<Dataresponse<Users>> {
  //   return this.http.post<Dataresponse<Users>>(API_URL, data);
  // }
  addTheme(data: any,id_formation:any): Observable<DataResponseObject<Theme>> {
    return this.http.post<DataResponseObject<Theme>>(API_URL + `/add/${id_formation}` , data);
  }
  getAllThemes(): Observable<DataResponseObject<Theme>> {
    return this.http.get<DataResponseObject<Theme>>(API_URL +'/');
  }
 
}
