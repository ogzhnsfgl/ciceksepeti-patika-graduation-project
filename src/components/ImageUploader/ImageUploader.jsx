/* eslint-disable react/prop-types */
import './imageUploader.scss';

import uploadIco from 'assets/icons/upload-ico.png';
import ProgressBar from 'components/ProgressBar';
import triggerToast from 'helpers/toastify';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postUploadFailure,
  postUploadPending,
  postUploadReset,
  postUploadSuccess,
} from 'redux/actions/uploadActions';
import uploadRequest from 'service/uploadRequest';

const ImageUploader = ({ emptyRequiredField, setRequired }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [progress, setProgress] = useState(null);
  const dispatch = useDispatch();
  const uploadState = useSelector((state) => state.upload);
  const { isPending, imageURL, error } = uploadState;

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
        if (
          selectedFile.size > 4 * 102400 ||
          !allowedTypes.includes(selectedFile.type)
        ) {
          triggerToast('error', 'PNG veya JPEG Dosya boyutu: max. 400kb!');
          setSelectedFile(null);
          setIsValid(false);
        } else {
          setIsValid(true);
          setRequired((prev) => ({
            ...prev,
            img: false,
          }));
          setProgress(0);
          handleUpload(selectedFile);
        }
      } catch (e) {
        // eslint-disable-next-line no-debugger
        debugger;
        triggerToast('error', 'Bir hata oluştu!');
      }
    }
  }, [dispatch, handleUpload, selectedFile, setRequired]);

  const handleClearUpload = () => {
    dispatch(postUploadReset());
    setSelectedFile(null);
    setProgress(null);
  };

  return (
    <div className="add__product-content-image">
      <h1>Ürün Görseli</h1>
      <div
        className={`upload-container ${emptyRequiredField ? 'not-valid' : ''}`}
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
            <img src={uploadIco} alt="upload-ico" />
            <p>
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

export default ImageUploader;
