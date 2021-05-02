import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public email='';
  public password='';
  public password2 ='';

  constructor(public fireAuth: AngularFireAuth, public router: Router, private toastController: ToastController) { }

  ngOnInit() {}
  async presenToast(text: string){
    const toast = await this.toastController.create({
      message:text,
      duration: 3000
    });
    toast.present();
  }
    public signup(){
      if(this.password===this.password2){

        this.fireAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(res=>{
          this.presenToast("Registration completed");
          this.router.navigate(['/login']);
  
        })
        .catch(error=>{
          this.email='';
          this.password='';
          this.presenToast(error);
          
  
        });
      }else{
        
        this.presenToast("Both passwords must be the same");
      }
    
    }
  

}
