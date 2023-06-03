import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Point} from "../models/Point";

@Injectable({
  providedIn: 'root'
})
export class PointDataService {
  private pointsSource = new Subject<Point[]>();
  pointsUpdated$ = this.pointsSource.asObservable();

  updatePoints(points: Point[]) {
    this.pointsSource.next(points);
  }
}
