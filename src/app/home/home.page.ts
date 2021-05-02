import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  objectList = [];
  movieList = [];
  newItem = '';

  º
  constructor(private router: Router, public homeService: HomeService, public firestore: AngularFirestore,private toastController: ToastController,public activatedRoute: ActivatedRoute) { 
    let todoRef = firestore.collection('peliculas');
    todoRef.get().subscribe(res => {
      if (res.empty) {
        //crea bd y consulta API
        console.log("No hay nada")
        this.homeService.getList()
          .subscribe((response: any) => {

            Object.keys(response).forEach(item => {
              this.objectList.push(item)

            })
            this.movieList = response.results;
            this.movieList.forEach(function (part) {
              let todoRef = firestore.doc('peliculas/' + part.title);
              todoRef.set({
                titledoc:part.title,
                title: part.title,
                description: part.opening_crawl,
                date: part.release_date,
                director: part.director
              })
            }

            );//movielist forEarch


            this.onRefreshMovies();
          }) //home service
          
          
      } else {
        this.onRefreshMovies();
        
      }

    })
  }//constructor
  ngOnInit(){
  }

  onRefreshMovies(){
    let movieListTemp = [];
    this.firestore.collection("peliculas").get()
      .subscribe(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          movieListTemp.push(doc.data())
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
        });

      });
    this.movieList = movieListTemp;

  }
  onDeleteItem(titledoc,title) {

    this.firestore.collection("peliculas").doc(titledoc).delete().then(() => {
      this.presenToast(title+ " has been deleted");
      this.onRefreshMovies();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  async presenToast(text: string){
    const toast = await this.toastController.create({
      message:text,
      duration: 3000
    });
    toast.present();
  }

  goToDetails(movie,edit){
    let dataString= JSON.stringify(movie);
    this.router.navigate(['filmdetail', dataString,edit]);
  }

  goToAdd(){
    let tipo='anadir';
    this.router.navigate(['filmdetail/'+tipo]);
  }

}//clase
