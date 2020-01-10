import React from "react";
import AuthService from '../AuthService/';

export default class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      loggedin: false
    }

    this.auth = new AuthService();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.update_loggedin = this.update_loggedin.bind(this);
  }

  update_loggedin(){
    this.setState({
      loggedin: this.auth.loggedIn(),
    });
    this.props.updateLoginStatus(this.auth.loggedIn())
  }

  login() {
    this.auth.login(this.state.username, this.state.password)
      .then(val => {this.update_loggedin()})
  }

  logout() {
    this.auth.logout()
      .then(val => {this.update_loggedin()});
  }

  render() {
    return (
      this.state.loggedin ? <button onClick={this.logout}>Logout</button> :
      <div>
          <input
            type="username"
            value={this.state.username}
            onChange={e => {
              this.setState({
                username: e.target.value,
              });
            }}
            placeholder="username"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={e => {
              this.setState({
                password: e.target.value,
              });
            }}
            placeholder="password"
          />
          <button onClick={this.login}>Sign In</button>
      </div>
    );
  }
}
