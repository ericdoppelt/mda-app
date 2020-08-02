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

    phone = "";
    setPhone(newPhone) {
        this.phone = newPhone;
    }
    get phoneError() {
        return this.phone === "" && this.submitted;
    }
    get phoneHelperText() {
        if (this.phoneError) return "Please enter your phone number.";
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
        if (this.financierError) return "Please enter the funding contact's name."
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
        if (this.financierPhoneError) return "Please enter the funding contact's phone number.";
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
        if (this.financierEmailError) return "Please enter the funding contact's email.";
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
        if (this.billingCityError) return "Please enter a billing city.";
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
        if (this.billingStateError) return "Please enter a billing state.";
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
        if (this.billingZipError) return "Please enter a billing zip.";
        else return "";
    }

    get validForm() {
        return !this.nameError && !this.emailError && !this.phoneError && !this.companyError && !this.integratorError
        && !this.financierError && !this.financierPhoneError && !this.financierEmailError && !this.billingAddressError && !this.billingCityError
        && !this.billingStateError && !this.billingZipError && this.submitted;
    }

    clear() {
        this.submitted = false;
        this.senderName = "";
        this.email = "";
        this.phone = "";
        this.company = "";
        this.integrator = "";
        this.financier = "";
        this.financierPhone = "";
        this.financierEmail = "";
        this.billingAddress = "";
        this.billingPO = "";
        this.billingCity = "";
        this.billingState = "";
        this.billingZip = "";
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

    phone: observable,
    setPhone: action,
    phoneError: computed,
    phoneHelperText: computed,

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
