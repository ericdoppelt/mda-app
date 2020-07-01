import {observable, action, decorate} from 'mobx';

class TAMUStore {
    badDates = "";
    setBadDates(newDates) {
        this.badDates = newDates;
    }
}

decorate(TAMUStore, {
badDates: observable,
setBadDates: action,
});

export default new TAMUStore();