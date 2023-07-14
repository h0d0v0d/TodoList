const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

export const emailValidate = (email: string) => {
  if (!email) {
    return "Fill in the field.";
  }
  if (!emailRegex.test(email)) {
    return "Incorrect format.";
  }
};

export const passwordValidate = (password: string) => {
  if (!password) {
    return "Fill in the field.";
  }
  if (password.length < 10) {
    return "Min length is 10.";
  }
};
