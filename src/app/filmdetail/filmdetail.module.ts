import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmdetailPageRoutingModule } from './filmdetail-routing.module';

import { FilmdetailPage } from './filmdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmdetailPageRoutingModule
  ],
  declarations: [FilmdetailPage]
})
export class FilmdetailPageModule {}
