import { ChatProvider } from './../../providers/chat/chat';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  public fotoEnviar;
  public fotoMostrar: boolean;
  public conversas: FirebaseListObservable<any>;
  public load;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private camera: Camera, public loadingCtrl: LoadingController, public providerChat: ChatProvider) {
    this.uIdA = navParams.get('uIdA');
    this.uIdB = navParams.get('uIdB');
    this.emailA = navParams.get('emailA');
    this.emailB = navParams.get('emailB');
    this.fotoEnviar = '';
    this.fotoMostrar = true;
    this.conversas = this.providerChat.getChatDetail(this.uIdA, this.uIdB);
  }

  enviarMSG() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Enviando Mensagem...',
    });
    this.load.present();
    console.log(this.msg)
    this.providerChat.pushChatDetail(this.uIdA, this.uIdB, this.msg, this.emailA, this.emailB, this.fotoEnviar)
      .then(data => {
        console.log(data);
        this.msg = '';
        this.fotoEnviar = '';
        this.fotoMostrar = true;
        this.load.dismiss();
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao enviar Mensagem.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.log(error)
      });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,//FILE_URI,//
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('aki');
      this.fotoEnviar = 'data:image/jpeg;base64,' + imageData;
      this.fotoMostrar = false;
    }, (err) => {
      console.log(err)
    });
  }
}
