import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { Student } from './student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  create(value: any) {
    throw new Error('Method not implemented.');
  }
  private baseURL ="http://localhost:8080/api";

  constructor(private httpClient : HttpClient) { }

  

  

  addStudentList(stu: Student) {
    console.log(stu);
    return this.httpClient.post<any>(this.baseURL + '/createstudent', stu);
  }

  getList(): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/getallstudent');
  }

  updateStudentList( data : any ,id:number) {
    return this.httpClient.put<any>(this.baseURL + '/updatestudent/'+id ,data);
  }
  deleteStudentList(id:number) {
    return this.httpClient.delete<any>(this.baseURL + '/deletestudent/'+id);
   }




}


