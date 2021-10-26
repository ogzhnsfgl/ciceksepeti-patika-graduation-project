import './addProduct.scss';

import AddProductForm from 'components/AddProductForm';
import AddProductResult from 'components/AddProductResult';
import ErrorWrapper from 'components/Error/ErrorWrapper';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar/Navbar';
import validateInfo from 'helpers/productAddValidator';
import useForm from 'Hooks/UseAddProductForm';
import UseBrands from 'Hooks/UseBrands';
import UseCategories from 'Hooks/UseCategories';
import UseColors from 'Hooks/UseColors';
import UseCreateProduct from 'Hooks/UseCreateProduct';
import UseStatus from 'Hooks/UseStatus';
import React, { useEffect, useState } from 'react';

function AddProduct() {
  const categoryState = UseCategories();
  const colorState = UseColors();
  const brandState = UseBrands();
  const statusState = UseStatus();
  const createProduct = UseCreateProduct();
  const { values, handleSubmit, errors, handleChange } = useForm(validateInfo);
  const [showResultPage, setShowResultPage] = useState(false);

  useEffect(() => {
    if (createProduct.product) {
      setShowResultPage(true);
    }
  }, [createProduct]);

  const isNull = [
    categoryState.categoryList,
    brandState.brandList,
    colorState.colorList,
    statusState.statusList,
  ].some((item) => item === null);

  const isError = [
    categoryState.error,
    brandState.error,
    colorState.error,
    statusState.error,
  ].some((error) => error);

  if (isError) {
    return (
      <ErrorWrapper
        errorMsg={
          categoryState.error.message ||
          brandState.error.message ||
          colorState.error.message ||
          statusState.error.message
        }
      />
    );
  }

  if (isNull) {
    return <LoadingContainer />;
  }

  if (showResultPage) {
    return <AddProductResult />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add__product">
          <div className="add__product-content">
            <AddProductForm
              categoryState={categoryState}
              brandState={brandState}
              colorState={colorState}
              statusState={statusState}
              values={values}
              handleChange={handleChange}
              errors={errors}
            />
            <ImageUploader error={errors?.imageUrl} onChange={handleChange} />
          </div>
          <button className="btn-save" type="button" onClick={handleSubmit}>
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
