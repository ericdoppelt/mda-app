import {observable, action, decorate} from 'mobx';

class SchedulingStore {
    
    facility = '';
    setFacility(newFacility) {
        this.facility = newFacility;
    }

    priorities = [];
    setPriorities(newPriorities) {
        this.priorities = newPriorities;
    }

    generals = [];
    setGenerals(newGenerals) {
        this.generals = newGenerals;
    }

    suggestion = [];
    setSuggestion(newSuggestion) {
        this.suggestion = newSuggestion;
    }

    startDateTime = '';
    setStartDateTime(newStartDate) {
        this.startDate = newStartDate;
    }

    endDateTime = '';
    setEndDateTime(newEndTime) {
        this.endDateTime = newEndTime;
    }
}

decorate(SchedulingStore, {
  facility: observable,
  setFacility: action,

  priorities: observable,
  setPriorities: action,

  generals: observable,
  setGenerals: action,

  suggestion: observable,
  setSuggestion: action,

  startDateTime: observable,
  setStartDateTime: action,

  endDateTime: observable,
  setEndDateTime: action,
});

export default new SchedulingStore();