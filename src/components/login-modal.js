import React from 'react';

import Modal from './modal';
import ModalContent from './modal-content';
import LoginForm from './login-form';

const LoginModal = ({ isVisible, isPending, hasError, onSubmit }) => (
  <Modal isVisible={ isVisible }>
    <ModalContent style={ styles.base }>
      <h1 className="mr2 ml2">Login</h1>

      <LoginForm
        isPending={ isPending }
        hasError={ hasError }
        onSubmit={ onSubmit } />
    </ModalContent>
  </Modal>
);

LoginModal.propTypes = {
  isVisible: React.PropTypes.bool,
  isPending: React.PropTypes.bool,
  hasError: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
};

const styles = {
  base: {
  },
};

export default LoginModal;
