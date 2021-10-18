import { useLayoutEffect, useState } from 'react';

function UseWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  let isMobile = false;
  if (size[0] < 768) {
    isMobile = true;
  }
  return isMobile;
}
export default UseWindowSize;
