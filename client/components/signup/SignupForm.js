import React, { Component } from 'react';
import classnames from 'classnames';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    this.setState({ errors: {}, isLoading: true })
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {}
    ).catch(errors => {
      this.setState({ errors: errors.response.data, isLoading: false })
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>
        <div className={classnames("form-group", { 'has-error': errors.username })}>
          <label htmlFor="username" className="control-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={this.state.username}
            onChange={this.onChange} />
            { errors.username && <span className="help-block">{errors.username}</span> }
        </div>

        <div className={classnames("form-group", { 'has-error': errors.email })}>
          <label htmlFor="Email" className="control-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange} />
        </div>

        <div className={classnames("form-group", { 'has-error': errors.password })}>
          <label htmlFor="password" className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChange} />
        </div>

        <div className={classnames("form-group", { 'has-error': errors.passwordConfirmation })}>
          <label htmlFor="passwordConfirmation" className="control-label">Password confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}>Sign up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
