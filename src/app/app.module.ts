import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login/login';
import { ModalUsersPage } from '../pages/modal-users/modal-users';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule,AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserProvider } from '../providers/user/user';
import { ChatProvider } from '../providers/chat/chat'; 

  var config = {
    apiKey: "AIzaSyBXXvUelTnpDKKA0Q0Nej2MyBje7qzhGY0",
    authDomain: "chatte-43df3.firebaseapp.com",
    databaseURL: "https://chatte-43df3.firebaseio.com",
    projectId: "chatte-43df3",
    storageBucket: "chatte-43df3.appspot.com",
    messagingSenderId: "252028614261"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ModalUsersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ModalUsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    UserProvider,
    ChatProvider
  ]
})
export class AppModule { }
