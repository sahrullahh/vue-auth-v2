import validator from "validator";

export const validateLogin = (request: any) => {
  const errors: any = {};
  const { email, password }: any = request;

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required.";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password field is required.";
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
  };
};

export const validateRegister = (request: any) => {
  const errors: any = {};
  const { name, email, password, confirmPassword }: any = request;

  if (validator.isEmpty(name)) {
    errors.name = "Name field is required.";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required.";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password field is required.";
  }
  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required.";
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
  };
};
