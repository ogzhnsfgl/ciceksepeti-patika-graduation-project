import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const baseTitle = 'İkinci El Project |';
    const prevTitle = document.title;
    document.title = `${baseTitle} ${title}`;
    return () => {
      document.title = prevTitle;
    };
  });
};

export default useTitle;
