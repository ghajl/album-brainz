import React from 'react';
import withStyles from 'react-jss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from './shared/Header';

const styles = {
  root: {
    height: '100%'
  }
};

class Page extends React.PureComponent {
  dialogClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const { children, message, isWaiting, classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        {children}
        <Modal size="sm" show={message.length > 0} onHide={this.dialogClose}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">{message}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="primary" onClick={this.dialogClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
