'use strict';

var React = require('react');
var $ = require('jquery');
var Store = require('../Store');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');

var FormUser = React.createClass({
  displayName: 'FormUser',

  getDefaultProps: function() {
    return {
      'title' : 'New user',
      'handler' : function() {console.log('No handler assigned!')},
      'data' : {'authorities' : ['USE_APP']}
    };
  },

  submit: function(e) {
    e.preventDefault();
    var data = {
      'name' : this.refs.name.value,
      'password' : this.refs.password.value,
      'limit' : this.refs.limit.value,
      'authorities' : $(this.refs.authorities).val()
    };
    if (this.props.data.id) {
      data['id'] = this.props.data.id;
    }
    if (this.props.data.version != null) {
      data['version'] = this.props.data.version;
    }
    this.props.handler(data);
  },

  reset: function() {
    this.refs.form.reset();
  },

  showErrors: function() {
  },

  componentWillMount: function() {
    Store.on(constants.CREATE_USER_SUCCESS, this.reset);
    Store.on(constants.UPDATE_USER_FAILURE, this.showErrors);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.CREATE_USER_SUCCESS, this.reset);
    Store.removeListener(constants.UPDATE_USER_FAILURE, this.showErrors);
  },

  componentDidMount: function() {
    $(this.refs.name.focus());
  },

  render: function() {
    return (
    <div className='container signup'>
      <form ref='form' onSubmit={this.submit}>
        <h2>{this.props.title}</h2>

        <div className='form-group'>
          <label htmlFor='name'>Username</label>
          <input ref='name' className='form-control' id='name' placeholder='Username' required autofocus defaultValue={this.props.data['name']}/>
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input ref='password' type='password' className='form-control' id='password' placeholder='Password' required defaultValue={this.props.data['password']}/>
        </div>

        <div className='form-group'>
          <label htmlFor='limit'>Daily calories limit</label>
          <input ref='limit' type='number' className='form-control' id='limit' placeholder='Calories' defaultValue={this.props.data['limit']}/>
        </div>

        <div className='form-group' className={Store.currentUser().hasRole('CRUD_USER') ? '' : 'app-no-display'}>
          <label htmlFor='authorities'>Roles</label>
            <select ref='authorities' multiple className='form-control app-multiselect' id='authorities' defaultValue={this.props.data['authorities']}>
              <option value='USE_APP'>User</option>
              <option value='CRUD_USER'>Users manager</option>
              <option value='CRUD_RECORD'>Records manager</option>
            </select>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
    );
  }
});

module.exports = FormUser;
