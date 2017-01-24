import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
      .then(res => {
        this.context.router.push('/');
      })
      .catch(err => {
        console.log(err)
        this.setState({ errors: err.response.data.errors, isLoading: false });
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { identifier, password, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          value={identifier}
          label="Username/Email"
          error={errors.identifier}
          onChange={this.onChange} />

        <TextFieldGroup
          field="password"
          type="password"
          value={password}
          label="Password"
          error={errors.password}
          onChange={this.onChange} />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
