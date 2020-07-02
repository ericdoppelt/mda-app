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

    ions = "";
    setIons(newIons) {
        this.ions = newIons;
    }
    get ionsError() {
        return this.ions === "" && this.submitted;
    }
    get ionsHelperText() {
        if (this.ionsError) return "Please enter the particles for the experiment.";
        return "";
    }

    energies = "";
    setEnergies(newEnergies) {
        this.energies = newEnergies;
    }
    get energiesError() {
        return this.energies === "" && this.submitted;
    }
    get energiesHelperText() {
        if (this.energiesError) return "Please enter the energies for the experiment.";
        return "";
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
    ionsError: computed,
    ionsHelperText: computed,

    energies: observable,
    setEnergies: action,
    energiesError: computed,
    energiesHelperText: computed,

    continuous: observable,
    setContinuous: action,
    continuousError: computed,
    continuousHelperText: computed,

    comments: observable,
    setComments: action,
});

export default new ExpirementStore();