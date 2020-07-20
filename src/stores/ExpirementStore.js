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

    hours = "";
    setHours(newHours) {
        this.hours = newHours;
    }
    get hoursError() {
        return this.hours === "" && this.submitted;
    }
    get hoursHelperText() {
        if (this.hoursError) return "Please enter the total hours for the experiment.";
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

    startDate = "";
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

    ions = observable.array([""]);
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
        console.log(index);
        return (this.energies[index] === ""  || this.energies[index] === undefined) && this.submitted;
    }
    energiesHelperText(index) {
        if (this.energiesError(index)) return "Please enter the energy level.";
        return "";
    }

    energyHours = observable.array([""]);
    setEnergyHours(newHour, index) {
        this.energyHours[index] = newHour;
    }
    energyHoursError(index) {
        return this.energyHours[index] === "" && this.submitted;
    }
    energyHoursHelperText(index) {
        if (this.energyHoursError(index)) return "Please enter the hours.";
        return "";
    }

    addBeam() {
        this.ions.push("");
        this.energies.push("");
        this.energyHours.push("");
    }
    clearBeams() {
        this.ions = observable.array([""]);;
        this.energies = observable.array([""]);;
    }

    continuous = "";
    setContinuous(newCont) {
        this.continuous = newCont;
    }
    get continuousError() {
        return this.continuous === "" && this.submitted;
    }
    get continuousHelperText() {
        if (this.continuousError) return "Please enter whether the experiment is continuous or interleaved.";
        else return "";
    }
    comments = "";
    setComments(newComment) {
        this.comments = newComment;
    }

    get validForm() {
        return !this.titleError && !this.hoursError && !this.personnelError && !this.startDateError
        && !this.ionsError && !this.energiesError && !this.continuousError && this.submitted;
    }
}

decorate(ExpirementStore, {
    submitted: observable,
    setSubmitted: action,

    title: observable,
    setTitle: action,
    titleError: computed,
    titleHelperText: computed,

    hours: observable,
    setHours: action,
    hoursError: computed,
    hoursHelperText: computed,

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

    energyHours: observable,
    setEnergyHours: action,
    energies: observable,
    setEnergies: action,

    addBeam: action,
    clearBeams: action,
    
    continuous: observable,
    setContinuous: action,
    continuousError: computed,
    continuousHelperText: computed,

    comments: observable,
    setComments: action,
});

export default new ExpirementStore();