import { Component, HostListener, OnInit } from '@angular/core';
import { Point } from './models/Point';
import { pointApi } from './services/pointApi';
import { PointDataService } from './services/PointDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  points: Point[];
  isFormVisible: boolean = false;

  constructor(
    private pointApiService: pointApi,
    private pointDataService: PointDataService
  ) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#form')) {
      this.isFormVisible = false;
    }
  }

  ngOnInit(): void {
    this.pointDataService.pointsUpdated$.subscribe((points: Point[]) => {
      this.points = points;
    });

    this.pointApiService.GetAllPoints().subscribe((data: Point[]) => {
      this.pointDataService.updatePoints(data);
    });
  }
}
