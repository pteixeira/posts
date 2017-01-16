import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
          <label htmlFor="username" className="control-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={this.state.username}
            onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="Email" className="control-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation" className="control-label">Password confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
