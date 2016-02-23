import React from 'react';
import LogoImage from '../assets/rangleio-logo.svg';

const Logo = ({ style = {} }) => (
  <img
    style={{ ...styles.base, ...style }}
    src={ LogoImage }
    alt="Rangle.io" />
);

const styles = {
  base: {
    width: 128,
  },
};

export default Logo;
