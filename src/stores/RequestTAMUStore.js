import {observable, action} from 'mobx';

class RequestTAMUStore {
    @observable time1 = "";
    @observable timeErrorText1 = "";

    @observable continuous1 = "";
    @observable continuousErrorText1 = "";

    @observable startDate1 = "";
    @observable startDateErrorText1 = "";

    @observable badDates1 = [];
    @observable badDatesErrorText1 = "";
      
    @observable particles1 = "";
    @observable particlesErrorText1 = "";
    
    @observable time2 = "";
    @observable timeErrorText2 = "";

    @observable continuous2 = "";
    @observable continuousErrorText2 = "";

    @observable startDate2 = "";
    @observable startDateErrorText2 = "";

    @observable badDates2 = [];
    @observable badDatesErrorText2 = "";
      
    @observable particles2 = "";
    @observable particlesErrorText2 = "";

    @observable senderName = "";
    @observable senderNameErrorText = "";
      
    @observable companyName = "";
    @observable companyNameErrorText = "";

    @observable poNumber = "";
    @observable poNumberErrorText = "";

    @observable billingAddress = "";
    @observable billingAddressErrorText = "";

    @observable billingCity = "";
    @observable billingCityErrorText = "";
    
    @observable billingState = "";
    @observable billingStateErrorText = "";
      
    @observable billingZip = "";
    @observable billingZipErrorText = "";

    // MOVE THIS INTO STATE
    @observable openStartDate1 = false;
    @observable openBadDates1 = false;

    @observable openStartDate2 = false;
    @observable openBadDates2 = false;

    @observable senderEmail = "";
    @observable senderEmailErrorText = "";
    
    @observable submitted = false;
    @observable validForm = false;
    @observable secondExperiment = false;
}