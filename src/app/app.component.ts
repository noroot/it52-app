import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { GA_ID } from '../app/constants';
import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private platform: Platform,
        private ga: GoogleAnalytics
    ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.initializeApp();
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // google
            this.ga.startTrackerWithId(GA_ID).then(() => {
                this.ga.setAllowIDFACollection(false);
            }).catch(e => console.log('Error starting GoogleAnalytics', e));
        });
    }
}
