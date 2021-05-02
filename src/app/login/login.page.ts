import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email ='';
  public password ='';

  constructor(public fireAuth: AngularFireAuth,public router: Router,private toastController: ToastController) { }

  ngOnInit() {}
  
  async presenToast(text: string){
    const toast = await this.toastController.create({
      message:text,
      duration: 3000
    });
    toast.present();
  }

  public Login(){
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password)
    .then(res=>{
      this.router.navigate(['/home']);
    })
    .catch(error =>{
      this.email='',
      this.password='';
      this.presenToast(error);
    });
  }
}
