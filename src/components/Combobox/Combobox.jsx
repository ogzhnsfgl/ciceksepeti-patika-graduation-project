import './combobox.scss';
import '@reach/listbox/styles.css';

import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import propTypes from 'prop-types';
import React, { memo, useState } from 'react';

const Combobox = (props) => {
  const { setSelect, error, name, list, value } = props;
  let defaultVal;

  switch (name) {
    case 'brand':
      defaultVal = 'Marka seçiniz';
      break;
    case 'color':
      defaultVal = 'Renk seçiniz';
      break;
    case 'status':
      defaultVal = 'Kullanım durumu seçiniz';
      break;
    case 'category':
      defaultVal = 'Kategori seçiniz';
      break;
    default:
      break;
  }
  if (value) {
    defaultVal = value.title;
  }
  const [selectedVal, setSelectedVal] = useState(defaultVal);

  const handleChange = (val) => {
    setSelectedVal(val);
    setSelect({ target: { name, value: val } });
  };

  return (
    <ListboxInput
      onChange={handleChange}
      value={selectedVal}
      className="combobox-wrapper"
      name={name}
    >
      <ListboxButton
        arrow
        className={`combobox-btn ${value ? 'valid' : ''} ${
          error ? 'not-valid' : ''
        }`}
      />
      <ListboxPopover portal={false}>
        <ListboxList className="combobox-list">
          <ListboxOption disabled value={defaultVal} className="combobox-item">
            {defaultVal}
          </ListboxOption>
          {list.map((item) => (
            <ListboxOption value={item} className="combobox-item" key={item.id}>
              {item.title.trim()}
            </ListboxOption>
          ))}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};

Combobox.propTypes = {
  setSelect: propTypes.func.isRequired,
  list: propTypes.array.isRequired,
  name: propTypes.string.isRequired,
  error: propTypes.bool,
  value: propTypes.object,
};

Combobox.defaultProps = {
  error: null,
  value: null,
};

export default memo(Combobox);
