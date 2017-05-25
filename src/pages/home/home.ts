import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { EventService, EventIt52 } from '../../providers/event-service';
import { EventPage } from '../../pages/event/event';
import { AboutPage } from '../../pages/about/about';
import { NativeStorage } from '@ionic-native/native-storage';
import * as moment from 'moment/moment';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { GA_ID } from '../../app/constants';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public events = [];
    public eventsFiltered = [];
    public eventFilter = 'upcoming';
    public isLoaded: boolean = false;
    public isNoInternet = false;

    constructor(
        public navCtrl: NavController,
        public eventService: EventService,
        public loadingCtrl: LoadingController,
        private network: Network,
        private platform: Platform,
        private nativeStorage: NativeStorage,
        private ga: GoogleAnalytics
    ) {
        this.events = [];
        this.eventsFiltered = [];
    }

    public goToEvent(event: EventIt52) {
        this.navCtrl.push(EventPage, { event: event });
    }

    public goToAbout() {
        this.navCtrl.push(AboutPage);
    }

    public updateEvents() {
        this.eventsFiltered = this.events.filter((value) => {
            if (this.eventFilter == 'upcoming') {
                return (moment(value.started_at).isSameOrAfter(moment().startOf('day')));
            } else {
                return (moment(value.started_at).isSameOrBefore(moment()));
            }
        });

        if (this.eventFilter == 'upcoming') {
            this.eventsFiltered = this.eventsFiltered.reverse();
        }
    }

    ionViewDidEnter() {
        this.ga.startTrackerWithId(GA_ID).then(() => {
            this.ga.trackView('Events list');
        }).catch(e => console.log('Error starting GoogleAnalytics', e));
    }

    ionViewDidLoad() {
        console.log("CONNECTION=");
        console.log(this.network.type);

        let loading = this.loadingCtrl.create({
            content: 'Ожидайте'
        });
        loading.present();

        if (this.isNoInternet) {
            loading.dismiss();

            this.nativeStorage.getItem('events')
                .then((data) => {
                    this.events = data;
                    this.updateEvents();
                }, error => console.error(error));
        } else {
            this.eventService.getEvents().subscribe((data: any) => {
                this.events = data;
                this.updateEvents();
                this.isLoaded = true;
                loading.dismiss();

                if (this.platform.is('ios')) {
                    this.nativeStorage.setItem('events', data)
                        .then(() => {
                            console.log('Stored item!')
                        }, error => console.error('Error storing item', error));
                }
            });
        }
    }

}
