/* eslint-disable no-debugger */
import checkValidField from './formValidation';

export default function validateInfo(values) {
  const errors = {};
  if (!values.title.trim()) {
    errors.title = true;
  }
  if (!values.description.trim()) {
    errors.description = true;
  }
  if (!values.brand) {
    errors.brand = true;
  }
  if (!values.category) {
    errors.category = true;
  }
  if (!values.color) {
    errors.color = true;
  }
  if (!values.status) {
    errors.status = true;
  }
  if (!values.price.trim() || !checkValidField('price', values?.price)) {
    errors.price = true;
  }
  if (!values.imageUrl) {
    errors.imageUrl = true;
  }
  return errors;
}
