import { LoginPage } from './../../pages/login/login';
import { HomePage } from './../../pages/home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
    this.user = afAuth.authState;
    console.log('Hello LoginProvider Provider');
  }
  /*
    login() { 
      console.log(this.user);
      console.log('teste'); 
  
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  
    }*/
  getLogado() {
    this.user.subscribe(user => {
      if (!user) {
        //this.navCtrl.setRoot(LoginPage);
        //this.navCtrl.popToRoot();
        console.log(null);
        return;
      }
      //this.navCtrl.setRoot(HomePage);
      console.log(user.displayName);
    });
    console.log(this.user)
  }
  signIn(email, senha) {
    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res.uid);
        var uid = res.uid;
        this.afDB.list("/usuarios/").update(uid, { name: email })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  signUp(email, senha) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res.uid);
        var uid = res.uid;
        this.afDB.list("/usuarios/").update(uid, { name: email })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
