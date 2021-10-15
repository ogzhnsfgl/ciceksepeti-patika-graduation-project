import './toggleSwitch.scss';

import propTypes from 'prop-types';
import React, { useState } from 'react';

const ToggleSwitch = ({ value, onChange }) => {
  const [toggleOn, setToggleOn] = useState(value);

  return (
    <div
      className={`holder ${toggleOn}`}
      onClick={() => {
        setToggleOn((prev) => (prev === 'on' ? 'off' : 'on'));
        onChange(!value);
      }}
      role="none"
    >
      <div className="toggle" />
    </div>
  );
};
ToggleSwitch.propTypes = {
  value: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
};

export default ToggleSwitch;
