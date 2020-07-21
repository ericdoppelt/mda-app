import {observable, action, decorate} from 'mobx';

class TAMUStore {
    
    badDates = [];
    setBadDates(newDate) {
        console.log(newDate);
        let index = -1;
        this.badDates.forEach(function(date, i) { 
            if (date.getTime() === newDate.getTime()) index = i;
        });

        if (index === -1) this.badDates.unshift(newDate);
        else this.badDates.splice(index, 1);
        console.log(this.badDates);
    }
}

decorate(TAMUStore, {
badDates: observable,
setBadDates: action,
});

export default new TAMUStore();