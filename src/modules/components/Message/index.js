import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import Snackbar from '@6thquake/react-material/Snackbar';
import MessageService from '$core/service/MessageService';
import SnackbarContent from './Snackbar';

const styles = theme => ({});

class Message extends Component {
  state = {
    type: 'INFO',
    open: false,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 3000,
    message: '提示',
    onClose() {
      this.setState({
        open: false,
      });
    },
  };

  componentDidMount() {
    new MessageService(this);
  }

  render() {
    const { onClose, type, message, ...rest } = this.state;
    const { classes } = this.props;
    return (
      <Snackbar {...rest} onClose={onClose}>
        <SnackbarContent type={type} message={message} onClose={onClose} />
      </Snackbar>
    );
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
