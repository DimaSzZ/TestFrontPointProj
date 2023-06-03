import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Point} from "../models/Point";

@Injectable({
  providedIn: 'root'
})

export class pointApi{
  private url : string = "https://localhost:44307/PointFigure/"
  constructor(private http : HttpClient) {
  }
  SavePoint(request: Point): Observable<any> {
    return this.http.post<any>(`${this.url}SavePoint`, request);
  }
  GetPoint(id:string) : Observable<Point>{
    return this.http.get<Point>(`${this.url}GetPoint?=${id}`)
  }
  GetAllPoints() : Observable<Point[]>{
    return this.http.get<Point[]>(`${this.url}GetAllPoints`)
  }
  DeletePoint(id:string){
    this.http.delete<string>(`${this.url}DeletePoint?id=${id}`).subscribe(r =>console.log(r))
  }
}
