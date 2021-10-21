import { useSelector } from 'react-redux';

const UseCreateProduct = () => {
  const createProduct = useSelector((state) => state.createProduct);

  return createProduct;
};

export default UseCreateProduct;
