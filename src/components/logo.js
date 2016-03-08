import React from 'react';
import LogoImage from '../assets/rangleio-logo.svg';

const Logo = () => (
  <div className="flex items-center">
    <img style={ styles }
      src={ LogoImage }
      alt="Rangle.io" />
  </div>
);

const styles = { width: 128 };

export default Logo;
