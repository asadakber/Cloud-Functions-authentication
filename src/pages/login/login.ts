import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  loading:Loading
  constructor(public loadCtrl: LoadingController,public fb: FormBuilder,public afauth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
    this.loginForm.reset()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signinUser() {
    if(!this.loginForm.valid) {
      console.log(this.loginForm.value)
    } else {
      this.afauth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.push(HomePage);
        });
      }, (error) => {
        this.loading.dismiss().then(() => {
          console.error(error);
        });
      });
      this.loading = this.loadCtrl.create();
      this.loading.present();
    }
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

}
