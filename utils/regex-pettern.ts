/* eslint-disable no-useless-escape */
const regexPatterns = {
  email:
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
  phone: /^([0])([1-9])(?:\d{6,12})$/,
  phoneNumber: /^([1-9])(?:\d{6,12})$/,
  address: /^[A-Za-z0-9 #&'\.\-\/=+,()\s]+$/,
  alphabetOnly: /^[a-zA-Z ]+$/,
  numberOnly: /^([0-9.-])+$/,
  password: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
};

export default regexPatterns;
