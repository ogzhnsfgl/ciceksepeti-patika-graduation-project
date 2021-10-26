import ErrorWrapper from 'components/Error';
import useTitle from 'Hooks/UseTitle';
import React from 'react';

const NotFound404 = () => {
  useTitle('404');
  return <ErrorWrapper errorMsg="Gitmeye çalıştığınız sayfayı bulamadık!" />;
};

export default NotFound404;
