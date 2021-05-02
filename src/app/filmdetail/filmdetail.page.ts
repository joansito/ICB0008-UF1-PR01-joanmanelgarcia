import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IdManagerService } from '../id-manager.service';

@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.page.html',
  styleUrls: ['./filmdetail.page.scss'],
})
export class FilmdetailPage implements OnInit {

  tipo=''
  editable='disabled'
  title="";
  description="";
  director="";
  date="";
  buttons;
  isShow;
  length;
  constructor(public firestore: AngularFirestore, public activatedRoute: ActivatedRoute,private toastController: ToastController,private router: Router) { 
  
  }

  ngOnInit() {
  
    let tipoOperacion=this.activatedRoute.snapshot.paramMap.get('edit')
    if(tipoOperacion=='editar'){
      this.isShow=true;
      this.onSetData()
      this.editable=null
  }else if(tipoOperacion=='anadir'){
  
    this.isShow=true;
    this.editable=null
  }else if(tipoOperacion=='show'){
    this.isShow=false;
   this.onSetData()
  }
 


}
onSetData(){
  let dataRecv= this.activatedRoute.snapshot.paramMap.get('dataObj')
  let obj = JSON.parse(dataRecv)
  this.title=obj.title
  this.description=obj.description
  this.director=obj.director
  this.date=obj.date
}

onAddEdit(){if(this.title!==''){
  let tipoOperacion=this.activatedRoute.snapshot.paramMap.get('edit')
  if(tipoOperacion=='anadir'){
    let todoRef = this.firestore.doc('peliculas/'+this.title);
    todoRef.set({
    titledoc:this.title,
    title: this.title,
    description: this.description,
    date: this.date,
    director: this.director
  }
  )
  this.title="";
  this.description="";
  this.director="";
  this.date="";
  }else if(tipoOperacion=='editar'){
  
    let dataRecv= this.activatedRoute.snapshot.paramMap.get('dataObj')
    let obj = JSON.parse(dataRecv)
    this.firestore.collection("peliculas").doc(obj.titledoc).update({
      title: this.title,
      description: this.description,
      date: this.date,
      director: this.director
      
  });
  
  }
  this.router.navigateByUrl('/home/');
}else{
  this.presenToast("Intoduce a title")
}
  

}


async presenToast(text: string){
  const toast = await this.toastController.create({
    message:text,
    duration: 3000
  });
  toast.present();
}

}
