const isFieldEmpties = (fields) => {
  const filteredKeys = Object.keys(fields).filter(
    (key) => fields[key] == "" || fields[key] == undefined
  );

  return filteredKeys;
};

const passwordValidator = (value) => {
  const anySpace = /^\S*$/;
  if (!anySpace.test(value)) {
    return "Password must not contain space.";
  }

  const anyUpperCase = /^(?=.*[A-Z]).*$/;
  if (!anyUpperCase.test(value)) {
    return "Password must have at least one uppercase character.";
  }

  const anyLowerCase = /^(?=.*[a-z]).*$/;
  if (!anyLowerCase.test(value)) {
    return "Password must have at least one lowercase character.";
  }

  const anyNumber = /^(?=.*[0-9]).*$/;
  if (!anyNumber.test(value)) {
    return "Password must contain at least one number.";
  }

  const anySymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!anySymbol.test(value)) {
    return "Password must contain at least one special symbol.";
  }

  const lengthRequirment = /^.{8,16}$/;
  if (!lengthRequirment.test(value)) {
    return "Password must be 8-16 characters long.";
  }

  return null;
};

module.exports = { isFieldEmpties, passwordValidator };
