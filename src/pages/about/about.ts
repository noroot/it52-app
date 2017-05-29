import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { GA_ID } from '../../app/constants';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(
        private iab: InAppBrowser,
        public platform: Platform,
        public navCtrl: NavController,
        private ga: GoogleAnalytics
    ) { }

    ionViewDidEnter() {
        this.ga.startTrackerWithId(GA_ID).then(() => {
            this.ga.trackView('Events list');
        }).catch(e => console.log('Error starting GoogleAnalytics', e));
    }

    public goToSite() {
        this.iab.create("https://www.it52.info", '_blank');
    }

    public goToTelegram() {
        this.iab.create("https://telegram.me/it52info", '_blank');
    }

    public goToAuthor() {
        this.iab.create("https://blog.overmind.be/contacts", '_blank');
    }
}
