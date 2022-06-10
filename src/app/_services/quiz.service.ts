import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz  } from 'src/app/model/quiz';

const API_URL = 'http://localhost:8082/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }


  addQuiz(data: any): Observable<DataResponseObject<Quiz>> {
    return this.http.post<DataResponseObject<Quiz>>(API_URL +`/add`, data);
  }

  getQuizById(id:any): Observable<DataResponseObject<Quiz>> {
    return this.http.get<DataResponseObject<Quiz>>(API_URL +`/GetQuiz`);
  }  

  getAllQuiz(): Observable<DataResponseObject<Quiz>> {
    return this.http.get<DataResponseObject<Quiz>>(API_URL +'/');
  }
}
