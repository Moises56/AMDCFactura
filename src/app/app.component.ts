import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
// ionic icosn
import { homeOutline, storefrontOutline, receiptOutline, albumsOutline, logInOutline } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonRouterOutlet, IonicModule, RouterLink],
})
export class AppComponent {
  accountPages = [
    {
       title: 'Log In',
       url: '/auth/login',
       ionicIcon: 'log-in-outline'
    },
    {
       title: 'Sign Up',
       url: '/auth/signup',
       ionicIcon: 'person-add-outline'
    },
    // ... // more pages
  ];
  
  constructor() { 
    addIcons({homeOutline, storefrontOutline, receiptOutline, albumsOutline, logInOutline});
  }
}
