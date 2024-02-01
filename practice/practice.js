const log = console.log;

const validate = {
  init() {
    validate.addListeners();
  },
  addListeners() {
    const form = document.querySelector('form');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const country = document.getElementById('country');
    const postal = document.getElementById('postalCode');
    const newPass = document.getElementById('newPass');
    const confirmPass = document.getElementById('confirmPass');
    const button = document.querySelector('button');

    fullName.addEventListener('change', validate.testName);
    email.addEventListener('change', validate.testEmail);
    country.addEventListener('change', validate.testCountry);
    postal.addEventListener('change', validate.testPostal);
    newPass.addEventListener('change', validate.testPassword);
    confirmPass.addEventListener('change', validate.testPassword);
    button.addEventListener('click', validate.validateAll);
  },
  testName(event) {
    const fullName = event.target;
    const nameReg = new RegExp('(^[A-Za-z]{2,18})[ ]([A-Za-z]{2,18})');
    const middleReg = new RegExp(
      '(^[A-Za-z]{2,18})[ ]([A-Za-z]{2,18})[ ]([A-Za-z]{2,18})'
    );

    fullName.setCustomValidity('');

    if (middleReg.test(fullName.value)) {
      fullName.setCustomValidity('Please remove your middle name');
      fullName.reportValidity();
    }

    if (!nameReg.test(fullName.value)) {
      fullName.setCustomValidity('Please write your given name and surname.');
      fullName.reportValidity();
    }
  },
  testEmail(event) {
    const email = event.target;
    const gmailReg = new RegExp('@gmail.com$', 'i');

    email.setCustomValidity('');
    if (!gmailReg.test(email.value)) {
      email.setCustomValidity('Please provide a valid gmail address');
      email.reportValidity();
    }
  },
  testCountry(event) {
    const country = event.target;
    if (
      country.value === 'US' ||
      country.value === 'USA' ||
      country.value === 'United States' ||
      country.value === 'Canada' ||
      country.value === 'Mexico'
    ) {
      country.setCustomValidity('');
    } else {
      country.setCustomValidity(
        'Your country should be located in North America'
      );
    }
    country.reportValidity();
  },
  testPostal(event) {
    const postal = event.target;
    const canReg = new RegExp('^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$');
    const usaReg = new RegExp('^\\b\\d{5}\\b(?:[- ]{1}\\d{4})?$');
    const mexReg = new RegExp('^\\d{5}$');
    if (
      canReg.test(postal.value) ||
      usaReg.test(postal.value) ||
      mexReg.test(postal.value)
    ) {
      postal.setCustomValidity('');
    } else {
      postal.setCustomValidity('Your postal code is not valid.');
    }
    postal.reportValidity();
  },
  testPassword(event) {
    const password = event.target;
    const passReg = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$'
    );
    if (passReg.test(password.value)) {
      password.setCustomValidity('');
    } else {
      password.setCustomValidity(
        'Password must contain one uppercase letter, one lowercase letter, one number, and one special character. It must be 8 to 10 characters long.'
      );
    }
  },
  validateAll(event) {
    const form = document.querySelector('form');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const country = document.getElementById('country');
    const postal = document.getElementById('postalCode');
    const newPass = document.getElementById('newPass');
    const confirmPass = document.getElementById('confirmPass');

    event.preventDefault();

    if (newPass.value === confirmPass.value) {
      confirmPass.setCustomValidity('');
    } else {
      confirmPass.setCustomValidity('Passwords do not match.');
    }

    fullName.reportValidity();
    email.reportValidity();
    country.reportValidity();
    postal.reportValidity();
    newPass.reportValidity();
    confirmPass.reportValidity();

    if (form.checkValidity()) {
      // log('newPass validity', newPass.validity);
      // log('form check validity', form.checkValidity());
      alert('You have filled the form with valid information!');
      form.reset();
    }
  },
};
document.addEventListener('DOMContentLoaded', validate.init);
