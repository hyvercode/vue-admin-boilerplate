export default class Event{
    id;
    openhouse_id;
    event_description;
    starting_event;
    ended_event;
    total_unit=0;
    total_bottom_prices_amount=0;
    total_open_prices_amount=0;
    notes;
    province;
    city;
    region_id;

    constructor(event_description) {
        this.event_description = event_description;
    }
}