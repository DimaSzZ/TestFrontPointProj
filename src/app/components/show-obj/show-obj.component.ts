import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Point } from "../../models/Point";
import { commentApi } from "../../services/commentApi";
import { Comment } from "../../models/Comment";
import Konva from "konva";
import { pointApi } from "../../services/pointApi";

@Component({
  selector: 'app-show-obj',
  templateUrl: './show-obj.component.html',
  styleUrls: ['./show-obj.component.css']
})
export class ShowObjComponent implements OnChanges, AfterViewInit {
  @Input() points: Point[];
  comments: { [key: string]: Comment[] } = {};
  private stage: Konva.Stage | undefined;
  private layer: Konva.Layer | undefined;
  private canvasElement: HTMLDivElement;
  private commentsShown: boolean = false

  constructor(
    private commentService: commentApi,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private pointService: pointApi
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.points && changes.points.currentValue) {
      const newPoints: Point[] = changes.points.currentValue;
      this.comments = {};

      newPoints.forEach((point: Point) => {
        if (point.id != null) {
          this.commentService.GetCommentsById(point.id).subscribe(
            (data: Comment[]) => {
              this.comments[point.id!] = data;
              this.drawPoint(point);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
    }
  }

  ngAfterViewInit() {
    this.canvasElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.canvasElement, 'width', '100%');
    this.renderer.setStyle(this.canvasElement, 'height', '100%');
    this.renderer.appendChild(this.elementRef.nativeElement, this.canvasElement);

    this.stage = new Konva.Stage({
      container: this.canvasElement,
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.layer.on('dblclick', (evt) => {
      const shape = evt.target;
      shape.remove();
      this.layer!.batchDraw();
    });
  }

  drawPoint(point: Point) {
    if (!this.stage || !this.layer) {
      return;
    }

    const circle = new Konva.Circle({
      x: point.axisX,
      y: point.axisY,
      radius: point.radius,
      fill: point.color,
      id: point.id!
    });
    circle.on('dblclick', () => {
      circle.remove();
      this.pointService.DeletePoint(circle.id());
      this.layer!.batchDraw();
    });
    circle.on('click', () => {
      if (this.commentsShown) {
        this.hideComments();
      } else {
        this.showComments(point);
      }
    });

    this.layer.add(circle);
    this.layer.batchDraw();
  }

  showComments(point: Point) {
    const comments = this.comments[point.id!];
    if (comments) {
      const container = document.createElement('div');
      container.classList.add('comments-container');
      container.style.position = 'absolute';
      container.style.left = `${point.axisX}px`;
      container.style.top = `${point.axisY + point.radius * 2 + 10}px`;

      comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.style.backgroundColor = comment.backGroundColor
        commentDiv.style.color = comment.colorText
        commentDiv.textContent = comment.text;
        container.appendChild(commentDiv);
      });

      document.body.appendChild(container);
      this.commentsShown = true;
    }
  }
  hideComments() {
    const container = document.querySelector('.comments-container');
    if (container) {
      container.remove();
    }
    this.commentsShown = false;
  }
}
