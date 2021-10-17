import './dragDropContainer.scss';

import propTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const DragDropContainer = ({ fileDrop }) => {
  const dropRef = useRef();
  const [drag, setDrag] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDrag(true);
      }
    };
    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (drag) {
        setDrag(false);
      }
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDrag(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileDrop(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
        setDrag(false);
      }
    };
    const container = dropRef.current;
    container.addEventListener('dragenter', handleDragIn);
    container.addEventListener('dragleave', handleDragOut);
    container.addEventListener('dragover', handleDrag);
    container.addEventListener('drop', handleDrop);
    return () => {
      container.removeEventListener('dragenter', handleDragIn);
      container.removeEventListener('dragleave', handleDragOut);
      container.removeEventListener('dragover', handleDrag);
      container.removeEventListener('drop', handleDrop);
    };
  }, [drag, fileDrop]);

  return (
    <div className={`dragdrop-wrapper ${drag ? 'active' : ''}`} ref={dropRef} />
  );
};

DragDropContainer.propTypes = {
  fileDrop: propTypes.func.isRequired,
};
export default DragDropContainer;
