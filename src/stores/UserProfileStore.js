import {observable, action, decorate} from 'mobx';

class UserProfileStore {
    
    sampText = ["store text"];
    setSampText(newDates) {
        this.sampText.push(newDates);
    }
}

decorate(UserProfileStore, {
    sampText: observable,
    setSampText: action,
});

export default new UserProfileStore();