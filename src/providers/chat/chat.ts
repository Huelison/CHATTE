import { ImageProvider } from './../image/image';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public afDB: AngularFireDatabase, public imgProvider: ImageProvider) {
    console.log('Hello ChatProvider Provider');
  }

  getChatDetail(uIdA, uIdB) {
    return this.afDB.list("/chats/" + uIdA + "/detail/" + uIdB);
  }

    getChats(uIdA) {
    return this.afDB.list("/chats/" + uIdA + "/infoChats/");
  }

  pushChatDetail(uIdA, uIdB, msg, emailA, emailB, img) {
    if (img == '') {
      var data = { msg: msg, tp: 'm', sender: uIdA };
      this.afDB.object("/chats/" + uIdB + "/infoChats/" + uIdA).set({ emailSender: emailA, lastMSG: msg });
      this.afDB.object("/chats/" + uIdA + "/infoChats/" + uIdB).set({ emailSender: emailB, lastMSG: msg });
      this.afDB.list("/chats/" + uIdB + "/detail/" + uIdA).push(data);
      return this.afDB.list("/chats/" + uIdA + "/detail/" + uIdB).push(data);
    } else {
      return this.imgProvider.uploadImage(img).then(data => {
        console.log(data);
        if (data.state == 'success'){
          var dataP = { msg: msg, tp: 'i', sender: uIdA, img:data.downloadURL }
          this.afDB.object("/chats/" + uIdB + "/infoChats/" + uIdA).set({ emailSender: emailA, lastMSG: msg });
          this.afDB.object("/chats/" + uIdA + "/infoChats/" + uIdB).set({ emailSender: emailB, lastMSG: msg });
          this.afDB.list("/chats/" + uIdB + "/detail/" + uIdA).push(dataP);
          return this.afDB.list("/chats/" + uIdA + "/detail/" + uIdB).push(dataP);
        }
      });
    }
  }
}
