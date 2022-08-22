const form = document.querySelector(".form");
const emailE1 = document.querySelector("#email");
const passwordE1 = document.querySelector("#password");
const firstnameE1 = document.querySelector("#firstname");
const lastnameE1 = document.querySelector("#lastname");

const checkFirstname = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const firstname = firstnameE1.value.trim();

  if (!isRequired(firstname)) {
    showError(firstnameE1, "Firstname cannot be blank.");
  } else if (!isBetween(firstname.length, min, max)) {
    showError(
      firstnameE1,
      `Firstname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstnameE1);
    valid = true;
  }
  return valid;
};

const checkLastname = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const lastname = lastnameE1.value.trim();

  if (!isRequired(lastname)) {
    showError(lastnameE1, "Lastname cannot be blank.");
  } else if (!isBetween(lastname.length, min, max)) {
    showError(
      lastnameE1,
      `Lastname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lastnameE1);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;

  const email = emailE1.value.trim();

  if (!isRequired(email)) {
    showError(emailE1, "Lastname cannot be blank.");
  } else if (!isBetween(email.length, min, max)) {
    showError(emailE1, `Email is not valid.`);
  } else {
    showSuccess(emailE1);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordE1.value.trim();

  if (!isRequired(password)) {
    showError(passwordE1, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordE1,
      `Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`
    );
  } else {
    showSuccess(passwordE1);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.qurySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFirstnameValid = checkFirstname(),
    isLastnameValid = checkLastname(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid =
    isFirstnameValid && isLastnameValid && isEmailValid && isPasswordValid;

  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "firstname":
        checkFirstname();
        break;
      case "lastname":
        checkLastname();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
