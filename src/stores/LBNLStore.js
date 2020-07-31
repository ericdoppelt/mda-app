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

    senderCity = "";
    setSenderCity(newCity) {
        this.senderCity = newCity;
    }

    senderState = "";
    setSenderState(newState) {
        this.senderState = newState;
    }

    senderZip = "";
    setSenderZip(newZip) {
        this.senderZip = newZip;
    }

    get senderFullAddress() {
        return this.senderAddress + ", " + this.senderCity + ", " + this.senderState + " " + this.senderZip;
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

    specialIons = "";
    setSpecialIons(newIons) {
        this.specialIons = newIons;
    }

    specialEnergies = "";
    setSpecialEnergies(newEnergy) {
        this.specialEnergies = newEnergy;
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


clear() {
    this.submitted = "";
    this.senderAddress = "";
    this.senderCity = "";
    this.senderState = "";
    this.senderZip = "";
    this.senderOfficePhone = "";
    this.experimentAbstract = "";
    this.alternateDate = "";
    this.targetMaterials = "";
    this.safetyConcerns = "";
    this.beamType = "";
    this.specialIons = "";
    this.specialEnergies = "";
    this.flux = "";
    this.airOrVacuum = "";
    this.controlRestrictions = "";
    this.electricallySafe = "";
    }
}
decorate(LBNLStore, {
    submitted: observable,
    setSubmitted: action,

    senderAddress: observable,
    setSenderAddress: action,

    senderCity: observable,
    setSenderCity: action,

    senderState: observable,
    setSenderState: action,

    senderZip: observable,
    setSenderZip: action,

    senderFullAddress: computed,

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

    specialIons: observable,
    setSpecialIons: action,

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