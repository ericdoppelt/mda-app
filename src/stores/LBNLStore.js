import {observable, action, decorate, computed} from 'mobx';

class LBNLStore {
    
    submitted = false;
    setSubmitted() {
        this.submitted = true;
    }

    senderAddress = "";
    setSenderAddress(newAddress) {
        this.senderAddress = newAddress;
    }

    senderOfficePhone = "";
    setSenderOfficePhone(newPhone) {
        this.senderOfficePhone = newPhone;
    }

    experimentAbstract = "";
    setExperimentAbstract(newAbstract) {
        this.experimentAbstract = newAbstract;
    }

    alternateDate = "";
    setAlternateDate(newDate) {
        this.alternateDate = newDate;
    }

    targetMaterials = "";
    setTargetMaterials(newMaterials) {
        this.targetMaterials = newMaterials;
    }

    safetyConcerns = "";
    setSafetyConcerns(newConcerns) {
        this.safetyConcerns = newConcerns;
    }
    
    beamType = "";
    setBeamType(newBeam) {
        this.beamType = newBeam;
    }

    specialParticles = "";
    setSpecialParticles(newIons) {
        this.specialParticles = newIons;
    }

    specialEnergies = "";
    setSpecialEnergies(newEnergy) {
        this.specialEnergy = newEnergy;
    }

    flux = "";
    setFlux(newFlux) {
        this.flux = newFlux;
    }
    
    airOrVacuum = "";
    setAirOrVacuum(newChoice) {
        this.airOrVacuum = newChoice;
    }

    controlRestrictions = "";
    setControlRestrictions(newRestrictions) {
        this.controlRestrictions = newRestrictions;
    }    

    electricallySafe = "";
    setElectricallySafe(newChoice) {
        this.electricallySafe = newChoice;
    }
}

decorate(LBNLStore, {
    submitted: observable,
    setSubmitted: action,

    senderAddress: observable,
    setSenderAddress: action,

    senderOfficePhone: observable,
    setSenderOfficePhone: action,

    experimentAbstract: observable,
    setExperimentAbstract: action,

    alternateDate: observable,
    setAlternateDate: action,

    targetMaterials: observable,
    setTargetMaterials: action,

    safetyConcerns: observable,
    setSafetyConcerns: action,

    beamType: observable,
    setBeamType: action,

    specialParticles: observable,
    setSpecialParticles: action,

    specialEnergies: observable,
    setSpecialEnergies: action,

    flux: observable,
    setFlux: action,

    airOrVacuum: observable,
    setAirOrVacuum: action,

    controlRestrictions: observable,
    setControlRestrictions: action,

    electricallySafe: observable,
    setElectricallySafe: action,
});

export default new LBNLStore();