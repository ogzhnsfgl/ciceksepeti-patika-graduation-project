import './imageUploader.scss';

import uploadIco from 'assets/icons/upload-ico.png';
import DragDropContainer from 'components/DragDropContainer';
import ProgressBar from 'components/ProgressBar';
import triggerToast from 'helpers/toastify';
import propTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postUploadFailure,
  postUploadPending,
  postUploadReset,
  postUploadSuccess,
} from 'redux/actions/uploadActions';
import uploadRequest from 'service/uploadRequest';

const ImageUploader = ({ error: reqError, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(!reqError);
  const [progress, setProgress] = useState(null);
  const dispatch = useDispatch();
  const uploadState = useSelector((state) => state.upload);
  const { isPending, imageURL, error } = uploadState;

  const handleClearUpload = () => {
    dispatch(postUploadReset());
    setSelectedFile(null);
    setProgress(null);
    onChange({ target: { name: 'imageUrl', value: false } });
  };

  const handleUpload = useCallback(() => {
    const formData = new FormData();

    formData.append('file', selectedFile);
    dispatch(postUploadPending());
    uploadRequest()
      .post(`/file/upload/image`, formData, {
        onUploadProgress(progressEvent) {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((res) => {
        dispatch(postUploadSuccess(res.data));
      })
      .catch((err) => dispatch(postUploadFailure(err)));
  }, [dispatch, selectedFile]);

  useEffect(() => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (selectedFile !== null) {
      try {
        const FILE_SIZE_100KB = 102400;
        if (
          selectedFile.size > 4 * FILE_SIZE_100KB ||
          !allowedTypes.includes(selectedFile.type)
        ) {
          triggerToast('error', 'PNG veya JPEG Dosya boyutu: max. 400kb!');
          setSelectedFile(null);
          setIsValid(false);
        } else {
          setIsValid(true);
          setProgress(0);
          handleUpload(selectedFile);
        }
      } catch (e) {
        triggerToast('error', 'Bir hata oluştu!');
      }
    }
  }, [dispatch, handleUpload, selectedFile]);

  return (
    <div className="add__product-content-image">
      <h1>Ürün Görseli</h1>
      <div
        className={`upload-container ${
          !selectedFile && reqError ? 'not-valid' : ''
        }`}
      >
        {isPending && <ProgressBar progressVal={progress} />}
        {error && <div>Bir hata oluştu</div>}
        {imageURL && (
          <div className="image-preview-wrapper">
            <span
              className="delete-btn"
              onClick={handleClearUpload}
              role="none"
            >
              X
            </span>
            <img
              src={imageURL.url}
              alt="previewImage"
              className="image-preview"
            />
          </div>
        )}
        {!isPending && !error && !imageURL && (
          <div className="upload-content">
            <DragDropContainer fileDrop={setSelectedFile} />
            <img src={uploadIco} alt="upload-ico" />

            <p className="hidden-mobile">
              Sürükleyip bırakarak yükle <br /> veya
            </p>

            <button className="btn-upload" type="button">
              Görsel Seçin
              <input
                type="file"
                name="image"
                id="image"
                multiple={false}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/png, image/jpeg, image/jpg"
              />
            </button>
            <p className={`upload-info-text ${!isValid ? 'warning' : ''}`}>
              PNG veya JPEG Dosya boyutu: max. 400kb
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  error: propTypes.bool,
  onChange: propTypes.func.isRequired,
};
ImageUploader.defaultProps = {
  error: undefined,
};

export default ImageUploader;
