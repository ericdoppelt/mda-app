import {observable, action, decorate, computed} from 'mobx';

class ExpirementStore {

    submitted = false;
    setSubmitted() {
        this.submitted = true;
    }

    title = "";
    setTitle(newTitle) {
        this.title = newTitle;
    }
    get titleError() {
        return this.title === "" && this.submitted;
    }
    get titleHelperText() {
        if (this.titleError) return "Please enter the title for the experiment.";
        else return "";
    }

    personnel = "";
    setPersonnel(newPersonnel) {
        this.personnel = newPersonnel;
    }
    get personnelError() {
        return this.personnel === "" && this.submitted;
    }
    get personnelHelperText() {
        if (this.personnelError) return "Please enter the personnel for the experiment.";
        else return "";
    }

    startDate = new Date('');
    setStartDate(newDate) {
        this.startDate = newDate;
        console.log(newDate);
    }
    get startDateError() {
        return this.startDate === "" && this.submitted;
    }
    get startDateHelperText() {
        if (this.startDateError) return "Please enter the start date for the experiment.";
        else return "";
    }

     ions = observable.array([]);
     setIons(newIons, index) {
        this.ions[index] = newIons;
    }
    ionsError(index) {
        return this.ions[index] === "" && this.submitted;
    }
    ionsHelperText(index) {
        if (this.ionsError(index)) return "Please enter the ion..";
        return "";
    }

    energies = observable.array([""]);
    setEnergies(newEnergies, index) {
        this.energies[index] = newEnergies;
    }
    energiesError(index) {
        return (this.energies[index] === ""  || this.energies[index] === undefined) && this.submitted;
    }
    energiesHelperText(index) {
        if (this.energiesError(index)) return "Please enter the energy level.";
        return "";
    }

    shifts = observable.array([""]);
    setShifts(newHour, index) {
        this.shifts[index] = newHour;
    }
    shiftsError(index) {
        return this.shifts[index] === "" && this.submitted;
    }
    shiftsHelperText(index) {
        if (this.shiftsError(index)) return "Enter the number of shifts.";
        return "";
    }

    hoursOn = observable.array([""]);
    setHoursOn(newHour, index) {
        this.hoursOn[index] = newHour;
    }
    hoursOnError(index) {
        return this.hoursOn[index] === "" && this.submitted;
    }
    hoursOnHelperText(index) {
        if (this.hoursOnError(index)) return "Enter the hours per shift.";
        return "";
    }

    hoursOff = observable.array([0]);
    setHoursOff(newHour, index) {
        console.log(newHour);
        console.log(index);
        this.hoursOff[index] = newHour;
    }
    hoursOffError(index) {
        return this.hoursOff[index] === "" && this.hoursOn[index] > 1 && this.submitted;
    }
    hoursOffHelperText(index) {
        if (this.hoursOffError(index)) return "Enter the hours between shifts.";
        return "";
    }

    numberBeams = 1;
    addBeam() {
        this.ions.push("");
        this.energies.push("");
        this.shifts.push("");
        this.hoursOn.push("");
        this.hoursOff.push(0);
        this.numberBeams++;
    }

    clear() {
        this.submitted = false;
        this.title = "";
        this.personnel = "";
        this.startDate = "";
        this.ions = observable.array([""]);;
        this.energies = observable.array([""]);;
        this.shifts = observable.array([""]);
        this.hoursOn = observable.array([""]);
        this.hoursOff = observable.array([""]);
        this.numberBeams = 1;
        this.comments = "";
    }

    comments = "";
    setComments(newComment) {
        this.comments = newComment;
    }

    get validForm() {
        let ionError = false;
        let energyError = false;
        let shiftsError = false;
        let hoursOnError = false;
        let hoursOffError = false;
        for (let i = 0; i < this.numberBeams; i++) {
            if (this.ionsError(i)) ionError = true;
            if (this.energiesError(i)) energyError = true;
            if (this.shiftsError(i)) shiftsError = true;
            if (this.hoursOnError(i)) hoursOnError = true;
            if (this.hoursOffError(i)) hoursOffError = true;
        }

        return !this.titleError && !this.personnelError && !this.startDateError
        && !ionError && !energyError && !shiftsError && !hoursOnError && !hoursOffError 
        && this.submitted;
    }
}

decorate(ExpirementStore, {
    submitted: observable,
    setSubmitted: action,

    title: observable,
    setTitle: action,
    titleError: computed,
    titleHelperText: computed,

    personnel: observable,
    setPersonnel: action,
    personnelError: computed,
    personnelHelperText: computed,

    startDate: observable,
    setStartDate: action,
    startDateError: computed,
    startDateHelperText: computed,

    ions: observable,
    setIons: action,

    energies: observable,
    setEnergies: action,

    shifts: observable,
    setShifts: action,

    hoursOn: observable,
    setHoursOn: action,

    hoursOff: observable,
    setHoursOff: action,

    addBeam: action,
    clearBeams: action,

    comments: observable,
    setComments: action,
});

export default new ExpirementStore();