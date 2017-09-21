import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
//modal de usuarios
@Component({
    selector: 'modal-users',
    templateUrl: 'modalUsers.html'
  })
  
  export class ModalUsers {
    character;
  
    constructor(
      public params: NavParams,
      public viewCtrl: ViewController
    ) {
      var characters = [
        {
          name: 'Gollum',
          quote: 'Sneaky little hobbitses!',
          image: 'assets/img/avatar-gollum.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'River Folk' },
            { title: 'Alter Ego', note: 'Smeagol' }
          ]
        },
        {
          name: 'Frodo',
          quote: 'Go back, Sam! I\'m going to Mordor alone!',
          image: 'assets/img/avatar-frodo.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'Shire Folk' },
            { title: 'Weapon', note: 'Sting' }
          ]
        },
        {
          name: 'Samwise Gamgee',
          quote: 'What we need is a few good taters.',
          image: 'assets/img/avatar-samwise.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'Shire Folk' },
            { title: 'Nickname', note: 'Sam' }
          ]
        }
      ];
      this.character = characters[0];
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }