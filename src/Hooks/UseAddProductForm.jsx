import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postCreateProduct from 'redux/actions/createProductActions';

const useForm = (validate) => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    brand: null,
    color: null,
    status: null,
    category: null,
    isOfferable: false,
    price: '',
  });
  const [errors, setErrors] = useState({});
  const imageURL = useSelector((state) => state.upload.imageURL);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
  };

  const isReadyToPost = () => {
    let isReady = true;
    Object.keys(errors).forEach((error) => {
      if (errors[error]) {
        isReady = false;
      }
    });
    Object.keys(values).forEach((value) => {
      if (values[value] === null || values[value] === '') {
        isReady = false;
      }
    });
    return isReady;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValues = { ...values, imageUrl: imageURL?.url };
    setValues(newValues);
    setErrors(validate(newValues));
    if (isReadyToPost() && imageURL) {
      const formData = { ...newValues, price: parseFloat(values.price) };
      dispatch(postCreateProduct(formData));
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
