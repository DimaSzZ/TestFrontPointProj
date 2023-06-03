import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Comment} from "../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class commentApi{
  private url : string = "https://localhost:44307/Comment/"
  constructor(private http : HttpClient) {
  }
   GetCommentsById(Id:string) : Observable<Comment[]>{
    return  this.http.get<Comment[]>(`${this.url}GetCommentsById?id=${Id}`).pipe(
      tap(response => {
        console.log(response);}))
  }
  SaveComments(Id:string,comments:Comment[]) : Observable<Comment[]>{
    const params = {
      id: Id
    };
    return this.http.post<Comment[]>(`${this.url}SaveComments`,comments,{ params: params })
  }
}
