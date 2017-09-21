import { ChatProvider } from './../../providers/chat/chat';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {
  public uIdA;
  public uIdB;
  public emailA;
  public emailB;
  public msg;
  public conversas:FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerChat:ChatProvider) {
    this.uIdA = navParams.get('uIdA');
    this.uIdB = navParams.get('uIdB');
    this.emailA = navParams.get('emailA');
    this.emailB = navParams.get('emailB');
    console.warn(this.uIdA);
    console.warn(this.uIdB);
    this.conversas = this.providerChat.getChatDetail(this.uIdA,this.uIdB);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
  }

  enviarMSG(){
    console.log(this.msg) 
    this.providerChat.pushChatDetail(this.uIdA,this.uIdB,this.msg,this.emailA,this.emailB ).then(data=>{console.log(data); this.msg='';},error=>{console.log(error)});
    //this.conversas.push().then(data=>{console.log(data)},error=>{console.log(error)});
  }

}
