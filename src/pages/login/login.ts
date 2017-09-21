import { HomePage } from './../home/home';
import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  senha: string;
  homePage: HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider) {
    this.email = '';
    this.senha = '';
    this.getLogado();
  }

  getLogado() {
    this.loginProvider.user.subscribe(user => {
      if (!user) {
        this.navCtrl.popToRoot();
        console.log(null);
        return;
      } else {
        this.navCtrl.setRoot(HomePage);
      }
      console.log(user.displayName);
    });
    console.log(this.loginProvider.user)
  }
  getLogin() {
    this.loginProvider.signIn(this.email, this.senha);
  }

  getSignUp() {
    this.loginProvider.signUp(this.email, this.senha);
  }

  getSignOut() {
    this.loginProvider.signOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
