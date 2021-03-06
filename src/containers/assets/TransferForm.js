import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
const styles = theme => ({
  container: {
    padding: 20,
  },
  textField: {
    marginRight: 10
  },
  button: {

  }
});

class TransferForm extends Component {
  state = {
    recipient: "",
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  handleSubmit = () => (e) => {
    e.preventDefault()
    this.props.onSubmit({
      recipient: this.state.recipient,
    })
  };



  render() {
    const { classes  } = this.props
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="recipient"
          label="recipient"
          className={classes.textField}
          value={this.state.recipient}
          onChange={this.handleChange('recipient')}
          margin="normal"
        />
        <Button variant="raised" color="primary" type="submit" className={classes.button} onClick={this.handleSubmit()}>
          Transfer
        </Button>
      </form>
    );
  }
}

export default withStyles(
  styles,
)(TransferForm);