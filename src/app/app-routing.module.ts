import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPointComponent} from "./components/add-point/add-point.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: 'Add-point', component: AddPointComponent },
  { path: '', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
