import { UserProvider } from './../../providers/user/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-users',
  templateUrl: 'modal-users.html',
})
export class ModalUsersPage {

  Users: FirebaseListObservable<any>;
  public uIdA;
  
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public userProvider: UserProvider
  ) {
    this.getUsuarios();
    this.uIdA = params.get('uIdA');
    console.log(params);
    
  }

  getUsuarios() {
    this.Users = this.userProvider.getAllUsers();
  }
  
  dismiss(uIdB,emailB) {
    console.log(uIdB);
    this.viewCtrl.dismiss({ uIdB: uIdB,emailB:emailB });
  }
}