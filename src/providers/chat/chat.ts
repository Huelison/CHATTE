import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }

  getChatDetail(uIdA, uIdB){
    return this.afDB.list("/chats/"+uIdA+"/detail/"+uIdB);
  }
  
  pushChatDetail(uIdA, uIdB, msg, emailA, emailB){
    this.afDB.object("/chats/"+uIdB+"/infoChats/"+uIdA).set({emailSender:emailA, lastMSG:msg});
    this.afDB.object("/chats/"+uIdA+"/infoChats/"+uIdB).set({emailSender:emailB, lastMSG:msg});
    this.afDB.list("/chats/"+uIdB+"/detail/"+uIdA).push({msg:msg,tp:'m',sender:uIdA});
    return this.afDB.list("/chats/"+uIdA+"/detail/"+uIdB).push({msg:msg,tp:'m',sender:uIdA});
  }
  getChats(uIdA){
    return this.afDB.list("/chats/"+uIdA+"/infoChats/");
  }
}
