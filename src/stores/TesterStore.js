import {observable, action, decorate, computed} from 'mobx';

class TesterStore {

    submitted = false;
    setSubmitted() {
        this.submitted = true;
    }

    senderName = "";
    setName(newName) {
        this.senderName = newName;
    }
    get nameError() {
        return this.senderName === "" && this.submitted;
    }
    get nameHelperText() {
        if (this.nameError) return "Please enter your name.";
        else return "";
    }

    email = "";
    setEmail(newEmail) {
        this.email = newEmail;
    }
    get emailError() {
        return this.email === "" && this.submitted;
    }
    get emailHelperText() {
        if (this.emailError) return "Please enter your email.";
        else return "";
    }

    cell = "";
    setCell(newCell) {
        this.cell = newCell;
    }
    get cellError() {
        return this.cell === "" && this.submitted;
    }
    get cellHelperText() {
        if (this.cellError) return "Please enter your cell number.";
        else return "";
    }
    
    company = "";
    setCompany(newCompany) {
        this.company = newCompany;
    }
    get companyError() {
        return this.company === "" && this.submitted;
    }
    get companyHelperText() {
        if (this.companyError) return "Please enter your organization.";
        else return "";
    }

    integrator = "";
    setIntegrator(newIntegrator) {
        this.integrator = newIntegrator;
    }
    get integratorError() {
        return this.integrator === "" && this.submitted;
    }
    get integratorHelperText() {
        if (this.integratorError) return "Please enter your integrator.";
        else return "";
    }

    financier = "";
    setFinancier(newFinancier) {
        this.financier = newFinancier;
    }
    get financierError() {
        return this.financier === "" && this.submitted;
    }
    get financierHelperText() {
        if (this.financierError) return "Please enter the name of the funding contact."
        else return "";
    }

    financierPhone = "";
    setFinancierPhone(newPhone) {
        this.financierPhone = newPhone;
    }
    get financierPhoneError() {
        return this.financierPhone === "" && this.submitted;
    }
    get financierPhoneHelperText() {
        if (this.financierPhoneError) return "Please enter the phone number of the funding contact.";
        else return "";
    }

    financierEmail = "";
    setFinancierEmail(newEmail) {
        this.financierEmail = newEmail;
    }
    get financierEmailError() {
        return this.financierEmail === "" && this.submitted;
    }
    get financierEmailHelperText() {
        if (this.financierEmailError) return "Please enter the email of the funding contact.";
        else return "";
    }

    billingAddress = "";
    setBillingAddress(newAddress) {
        this.billingAddress = newAddress;
    }
    get billingAddressError() {
        return this.billingAddress === "" && this.submitted;
    }
    get billingAddressHelperText() {
        if (this.billingAddressError) return "Please enter a billing address.";
        else return "";
    }

    billingPO = "";
    setBillingPO(newPO) {
        this.billingPO = newPO;
    }
    
    billingCity = "";
    setBillingCity(newCity) {
        this.billingCity = newCity;
    }
    get billingCityError() {
        return this.billingCity === "" && this.submitted;
    }
    get billingCityHelperText() {
        if (this.billingCityError) return "Please enter a city for the billing address.";
        else return "";
    }

    billingState = "";
    setBillingState(newState) {
        this.billingState = newState;
    }
    get billingStateError() {
        return this.billingState === "" && this.submitted;
    }
    get billingStateHelperText() {
        if (this.billingStateError) return "Please enter a state for the billing address.";
        else return "";
    }

    billingZip = "";
    setBillingZip(newZip) {
        this.billingZip = newZip;
    }
    get billingZipError() {
        return this.billingZip === "" && this.submitted;
    }
    get billingZipHelperText() {
        if (this.billingZipError) return "Please enter a zip for the billing address.";
        else return "";
    }

    get validForm() {
        return !this.nameError && !this.emailError && !this.cellError && !this.companyError && !this.integratorError
        && !this.financierError && !this.financierPhoneError && !this.financierEmailError && !this.billingAddressError && !this.billingCityError
        && !this.billingStateError && !this.billingZipError && this.submitted;
    }
}

decorate(TesterStore, {
    submitted: observable,
    setSubmitted: action,

    senderName: observable,
    setName: action,
    nameError: computed,
    nameHelperText: computed,

    email: observable,
    setEmail: action,
    emailError: computed,
    emailHelperText: computed,

    cell: observable,
    setCell: action,
    cellError: computed,
    cellHelperText: computed,

    company: observable,
    setCompany: action,
    companyError: computed,
    companyHelperText: computed,

    integrator: observable,
    setIntegrator: action,
    integratorError: computed,
    integratorHelperText: computed,

    financier: observable,
    setFinancier: action,
    financierError: computed,
    financierHelperText: computed,

    financierPhone: observable,
    setFinancierPhone: action,
    financierPhoneError: computed,
    financierPhoneHelperText: computed,

    financierEmail: observable,
    setFinancierEmail: action,
    financierEmailError: computed,
    financierEmailHelperText: computed,

    billingAddress: observable,
    setBillingAddress: action,
    billingAddressError: computed,
    billingAddressHelperText: computed,

    billingPO: observable,
    setBillingPO: action,
    
    billingCity: observable,
    setBillingCity: action,
    billingCityError: computed,
    billingCityHelperText: computed,

    billingState: observable,
    setBillingState: action,
    billingStateError: computed,
    billingStateHelperText: computed,

    billingZip: observable,
    setBillingZip: action,
    billingZipError: computed,
    billingZipHelperText: computed,
});

export default new TesterStore();
