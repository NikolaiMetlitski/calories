'use strict';

var React = require('react');
var dispatcher = require('../Dispatcher');
var constants = require('../Constants');
var $ = require('jquery');

/**
*
* Login.
*
*/
var Login = React.createClass({
  displayName: 'Footer',

  submit: function(e) {
    e.preventDefault();
    dispatcher.dispatch({
      'type': constants.LOGIN,
      'data': {
        'username': this.refs.username.value,
        'password': this.refs.password.value
      }
    });
  },

  signUp: function(e) {
    e.preventDefault();
    dispatcher.dispatch({
      'type': constants.SIGN_UP_REQUEST
    });
  },

  componentDidMount: function() {
    $(this.refs.username.focus());
  },

  render: function() {
    return (
    <div className='container app-signin'>
      <form className='form-signin' onSubmit={this.submit}>
        <h2 className='form-signin-heading'>Please sign in or <a href='javascript:void(0)' onClick={this.signUp}>Sign up</a></h2>

        <div className='form-group'>
          <label htmlFor='username' className='sr-only'>Email address</label>
          <input ref='username' name='username' id='username' className='form-control' placeholder='Username' required autofocus />
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='sr-only'>Password</label>
          <input ref='password' type='password' name='password' id='password' className='form-control' placeholder='Password' required />
        </div>
        <div className='form-group'>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
        </div>
      </form>
    </div>
    );
  }

});

module.exports = Login;
