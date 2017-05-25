import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment/moment';

export class EventIt52 {

    id: number;
    title: string;
    link: string;
    description: string;
    started_at: string;
    started_at_js: string;
    place: string;
    organizer: string;
    image: string;
    participant_cx: string;

    color: string;
    public isToday: boolean = false;

    constructor(
        id?: number,
        title?: string,
        description?: string,
        link?: string,
        started_at?: string,
        started_at_js?: string,
        place?: string,
        organizer?: string,
        image?: string,
        participant_cx?: string) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
        this.started_at = started_at;
        this.started_at_js = started_at_js;
        this.place = place;
        this.organizer = organizer;
        this.image = image;
        this.participant_cx = participant_cx;
        if (place) {
            this.color = this.stringToColor(place);
        }
    }

    stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

}

@Injectable()
export class EventService {

    constructor(private http: Http) { }

    public getEvents() {

        let feedUrl = 'https://www.it52.info/api/v1/events.json';
        let events = new Array();
        return this.http.get(feedUrl)
            .map(data => data.json())
            .map((res) => {
                if (res == null) {
                    return events;
                }
                var length = 20;

                for (let i = 0; i < res.length; i++) {
                    let item = res[i]
                    let newFeedItem = new EventIt52(
                        item.id,
                        item.title,
                        item.description,
                        item.slug,
                        item.started_at,
                        item.started_at_js,
                        item.place,
                        item.organizer.full_name,
                        item.image_url,
                        item.participants.length
                    );

                    if (moment(item.started_at).isSame(moment().startOf('day'), 'day')) {
                        newFeedItem.isToday = true;
                    }

                    events.push(newFeedItem);
                }
                return events
            })
    }
}
