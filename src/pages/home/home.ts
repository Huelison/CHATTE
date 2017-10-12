import { FirebaseListObservable } from 'angularfire2/database';
import { LoginPage } from './../login/login';
import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ChatProvider } from './../../providers/chat/chat';
import { ModalUsersPage } from './../modal-users/modal-users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public User: any;
  public Chats: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public loginProvider: LoginProvider, 
    public modalCtrl: ModalController, public chatProvider: ChatProvider) {
    this.getLogado();
  }

  getLogado() {
    this.loginProvider.user.subscribe(user => {
      if (!user) {
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.popToRoot();
        console.log(null);
        return;
      }
      console.log(user);
      this.User = user;
      this.Chats = this.chatProvider.getChats(this.User.uid);
    });
    console.log(this.loginProvider.user)
  }

  signOut() {
    this.loginProvider.signOut();
  }

  newChat() {
    let modal = this.modalCtrl.create(ModalUsersPage, { uIdA: this.User.uid });
    console.log(this.User);
    modal.present();
    modal.onDidDismiss((data, teste) => {
      console.log(data);
      console.log(teste);
      this.getChatDetail(data.uIdB, data.emailB);
    })
  }

  getChatDetail(uIdB, emailB) {
    this.navCtrl.push('ChatDetailPage', { uIdA: this.User.uid, uIdB: uIdB, emailA: this.User.email, emailB: emailB });
  }
}