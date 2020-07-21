import {observable, action, decorate} from 'mobx';

class SchedulingStore {

    constructor(){
        this.toggleCalendar = this.toggleCalendar.bind(this);
      }
    
    viewCalendar = true;
    toggleCalendar() {
        this.viewCalendar = !this.viewCalendar;
    }

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

    requests = [];
    setRequests(newRequests) {
        this.requests = newRequests;
        console.log("set");
        console.log(newRequests);
    }

    rangeRequests(startDate, endDate, facility) {

        let start = new Date(startDate);
        // let end = new Date(endDate);
        let returnedRequests = [];

        for (let i = 0; i < this.requests.length; i++) {
            let tempRequest = this.requests[i];
            let tempStart = new Date(tempRequest.startDate);
            let tempFacility = tempRequest.facility;
            if (tempFacility === facility && tempStart < start) {
                returnedRequests.unshift(tempRequest);
            }
        }
        console.log("returned");
        console.log(returnedRequests);
        return returnedRequests;
    }

    startDateTime = '';
    setStartDateTime(newStartDate) {
        this.startDateTime = newStartDate;
    }

    endDateTime = '';
    setEndDateTime(newEndTime) {
        this.endDateTime = newEndTime;
    }
}

decorate(SchedulingStore, {

  viewCalendar: observable,
  toggleCalendar: action,

  facility: observable,
  setFacility: action,

  priorities: observable,
  setPriorities: action,

  generals: observable,
  setGenerals: action,

  suggestion: observable,
  setSuggestion: action,

  requests: observable,
  setRequests: action,

  startDateTime: observable,
  setStartDateTime: action,

  endDateTime: observable,
  setEndDateTime: action,
});

export default new SchedulingStore();