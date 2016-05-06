module.exports = {

  'Login page': function(client) {
    client
      .url('http://localhost:8080/calories-web-app/')
      .waitForElementVisible('#app', 1000)
      .assert.visible('form.form-signin')
      .end();
   }

};
