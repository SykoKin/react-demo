import React from 'react';
import classnames from 'classnames';
import propsTypes from 'prop-types';
import './Icon.css';

const scriptElem = document.createElement('script');
scriptElem.src = '//at.alicdn.com/t/font_1672734_wj7ba29l7k9.js';
document.body.appendChild(scriptElem);

function SuperIcon({ className, type, ...restProps }) {
  return (
    <svg
      className={classnames('super-icon', className)}
      aria-hidden="true"
      {...restProps}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

SuperIcon.propsTypes = {
  type: propsTypes.string.isRequired,
  style: propsTypes.object,
};

export default SuperIcon;