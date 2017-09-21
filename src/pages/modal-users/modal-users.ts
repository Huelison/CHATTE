import { UserProvider } from './../../providers/user/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-users',
  templateUrl: 'modal-users.html',
})
export class ModalUsersPage {
  Users: FirebaseListObservable<any>;

  getUsuarios() {
    this.Users = this.userProvider.getAllUsers();
  }

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public userProvider: UserProvider
  ) {
    this.getUsuarios();
  }

  dismiss(uIdB,emailB) {
    console.log(uIdB);
    this.viewCtrl.dismiss({ uIdB: uIdB,emailB:emailB });
  }
}