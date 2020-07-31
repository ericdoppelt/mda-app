import {observable, action, decorate} from 'mobx';

class NSRLStore {
    endDate = "";
    setEndDate(newDate) {
        this.endDate = newDate;
    }

    experimentType = "";
    setExperimentType(newType) {
        this.experimentType = newType;
    }

    isNasa = "";
    setIsNasa(newNasa) {
        this.isNasa = newNasa;
    }

    let = "";
    setLet(newLET) {
        this.let = newLET;
    }

    beamSize = "";
    setBeamSize(newBeam) {
        this.beamSize = newBeam;
    }

    maxDose = "";
    setMaxDose(newDose) {
        this.maxDose = newDose;
    }

    clear() {
        this.endDate = "";
        this.experimentType = "";
        this.isNasa = "";
        this.let = "";
        this.beamSize = "";
        this.maxDose = "";
    }
}

decorate(NSRLStore, {
    endDate: observable,
    setEndDate: action,

    experimentType: observable,
    setExperimentType: action,

    isNasa: observable,
    setIsNasa: action,

    let: observable,
    setLet: action,

    beamSize: observable,
    setBeamSize: action,

    maxDose: observable,
    setMaxDose: action,
});

export default new NSRLStore();