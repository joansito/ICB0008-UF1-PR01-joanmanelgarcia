import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';



var firebaseConfig = {
  apiKey: "AIzaSyCpLXgLf1ZMS3AK_8QggFQVTyIXFUM6-Z8",
  authDomain: "salle2021.firebaseapp.com",
  projectId: "salle2021",
  storageBucket: "salle2021.appspot.com",
  messagingSenderId: "402039638367",
  appId: "1:402039638367:web:de7a84cc292a9dd47f4eea",
  measurementId: "G-YLY85LX51Q"};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    
    AngularFirestoreModule, AngularFireAuthModule],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
