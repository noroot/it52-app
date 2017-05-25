import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, NavParams, Content } from 'ionic-angular';
import { EventService, EventIt52 } from '../../providers/event-service';
import marked from 'marked';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { GA_ID } from '../../app/constants';


@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage {

    @ViewChild(Content) content: Content;

    public event: EventIt52;
    public markdownText = '';
    public loading: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public eventService: EventService,
        private ga: GoogleAnalytics

    ) {
        this.event = new EventIt52();
        this.loading = false;
    }

    ionViewDidLoad() {

        this.loading = this.loadingCtrl.create({
            content: 'Ожидайте...'
        });
        this.loading.present();
    }

    ionViewDidEnter() {

        if (this.navParams.get('event') != null) {
            this.event = this.navParams.get('event');
            this.ga.startTrackerWithId(GA_ID).then(() => {
                this.ga.trackView('Event ' + this.event.title);
            }).catch(e => console.log('Error starting GoogleAnalytics', e));

            console.log(this.event);
            this.markdownText = marked(this.event.description.toString());
            this.loading.dismiss();

        }
    }
}
