import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KonvaModule } from 'ng2-konva';
import { AddPointComponent } from './components/add-point/add-point.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
import { ShowObjComponent } from './components/show-obj/show-obj.component';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PointDataService} from "./services/PointDataService";

@NgModule({
  declarations: [
    AppComponent,
    AddPointComponent,
    AddCommentsComponent,
    ShowObjComponent
  ],
  imports: [
    BrowserModule,
    KonvaModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PointDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
