import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }

  getAllUsers(){
    return this.afDB.list("/usuarios/");
  }
}
