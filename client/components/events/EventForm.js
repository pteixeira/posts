import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/event/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      title: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { isLoading, title, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create a new game event</h1>

        <TextFieldGroup
          field="title"
          label="Event title"
          value={title}
          onChange={this.onChange}
          error={errors.title} />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);
