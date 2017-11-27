import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {

  state = {
    data: {
      email:'',
      password:''
    },
    loading: false,
    errors: {}
  };

  onChange = e => this.setState({
    // ... = spread operator https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
    // So here we just save the previous data attributes and update the modified ones
    data:{...this.state.data, [e.target.name]: e.target.value}
  });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    // If there is no key in errors object, that means there is no error.
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = (data) => {
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
    if(!data.password) errors.password = "Please fill this field";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="bruce.wayne@gotham-city.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="●●●●●●●●"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Login</Button>
      </Form>
    );
  }

}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm
