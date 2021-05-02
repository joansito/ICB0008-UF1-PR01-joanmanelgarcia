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
            let counter=0
            this.movieList = response.results;
            this.movieList.forEach(function (part) {
              part.id = counter;
              let todoRef = firestore.doc('peliculas/' + part.id);
              todoRef.set({
                id: part.id,
                title: part.title,
                description: part.opening_crawl,
                date: part.release_date,
                director: part.director
              })
              counter+=1;
            }

            );//movielist forEarch


          }) //home service
          
          
          this.onRefreshMovies();
      } else {
        this.onRefreshMovies();
        
      }

    })
  }//constructor
  ngOnInit(){
  let dataRecv= this.activatedRoute.snapshot.paramMap.get('reload')
  {
    if(dataRecv==='reload'){
      
    this.onRefreshMovies();
    this.router.navigateByUrl('/home')
    }
  }
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
    console.log(movieListTemp.length+"ESTO ES LO QUE MIDE EN ONREFRESHMOVIES")

  }
  onDeleteItem(id,title) {

    this.firestore.collection("peliculas").doc(id.toString()).delete().then(() => {
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
