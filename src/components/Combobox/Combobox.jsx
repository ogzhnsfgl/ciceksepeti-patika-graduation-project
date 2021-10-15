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
import React, { useState } from 'react';

const Combobox = ({
  list,
  setSelect,
  defaultVal,
  emptyRequiredField,
  setRequired,
  name,
}) => {
  const [value, setValue] = useState(defaultVal);

  return (
    <ListboxInput
      defaultValue="popeyes"
      onChange={(val) => {
        setValue(val);
        setSelect(val);

        switch (name) {
          case 'category':
            setRequired((prev) => ({ ...prev, category: false }));
            break;
          case 'status':
            setRequired((prev) => ({ ...prev, status: false }));
            break;
          case 'color':
            setRequired((prev) => ({ ...prev, color: false }));
            break;
          case 'brand':
            setRequired((prev) => ({ ...prev, brand: false }));
            break;
          default:
            break;
        }
      }}
      value={value}
      className="combobox-wrapper"
    >
      <ListboxButton
        arrow
        className={`combobox-btn ${value !== defaultVal ? 'valid' : ''} ${
          emptyRequiredField ? 'not-valid' : ''
        }`}
      />
      <ListboxPopover portal={false}>
        <ListboxList className="combobox-list">
          <ListboxOption disabled value={defaultVal} className="combobox-item">
            {defaultVal}
          </ListboxOption>
          {list.map((item) => (
            <ListboxOption
              value={item}
              className="combobox-item"
              key={item.title}
            >
              {item.title.trim()}
            </ListboxOption>
          ))}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};

Combobox.propTypes = {
  list: propTypes.array.isRequired,
  setSelect: propTypes.func.isRequired,
  defaultVal: propTypes.string.isRequired,
  emptyRequiredField: propTypes.bool.isRequired,
  setRequired: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};

export default Combobox;
