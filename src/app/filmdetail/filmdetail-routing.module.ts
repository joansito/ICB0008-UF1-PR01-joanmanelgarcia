import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmdetailPage } from './filmdetail.page';

const routes: Routes = [
  {
    path: '',
    component: FilmdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmdetailPageRoutingModule {}
