import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {pointApi} from "../../services/pointApi";
import {Point} from "../../models/Point";
import {Router} from "@angular/router";
import {PointDataService} from "../../services/PointDataService";


@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css']
})
export class AddPointComponent implements OnInit{
  form: FormGroup;
  constructor(private pointService:pointApi,
              private pointDataService: PointDataService,
              private router:Router) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      x: new FormControl(''),
      y: new FormControl(''),
      rad: new FormControl(''),
      color: new FormControl('')
    });
  }
  AddPoint() {
    let point: Point = {
      id: null,
      axisX: this.form.value.x,
      axisY: this.form.value.y,
      radius: this.form.value.rad,
      color: this.form.value.color
    };

    this.pointService.SavePoint(point).subscribe(() => {
      this.pointService.GetAllPoints().subscribe((data: Point[]) => {
        this.pointDataService.updatePoints(data);
      });
    });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
