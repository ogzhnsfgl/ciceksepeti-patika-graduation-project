const checkValidField = (fieldType, input) => {
  let isValid = false;
  switch (fieldType) {
    case 'email':
      if (input.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null)
        isValid = true;
      break;
    case 'password':
      if (input.length >= 8) isValid = true;
      break;
    case 'price':
      return !Number.isNaN(input - parseFloat(input));
    default:
      isValid = false;
      break;
  }
  return isValid;
};

export default checkValidField;
