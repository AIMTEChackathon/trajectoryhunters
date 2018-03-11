import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import SnackbarUser from "../Components/Snackbar";
import { TextField } from "material-ui";
import "../Components/SuperMobileTearSheet"
import SuperMobileTearSheet from "../Components/SuperMobileTearSheet";

class Auth extends Component {



  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: null,
      sport: ""
    }
  }

  componentWillMount() {

  }

  login() {
    this.setState({ isLogin: true })
  }

  render() {

    const Wrapper = ({children}) => (
      <div>
        <div>{children}</div>
      </div>
    );

    const login = () => (
      <Wrapper>
        <SuperMobileTearSheet name={this.state.name} age={this.state.age} sport={this.state.sport} />
      </Wrapper>
    )
    const notlogin = <div>
      <p>Zde je možnost se přihlásit.</p>

    <TextField
    hintText="Jméno atleta/ky"

    onChange={(name) => this.setState({name})}

    />
      <TextField
    hintText="Věk"
    onChange={(age) => this.setState({age})}

      />
      <TextField
    hintText="Sport"
    onChange={(ev, value, index) => this.setState({value})}

      />

      <RaisedButton label="Přihlásit" onClick={()=> this.login()} />

    </div>

    return (
      <div>
        {this.state.isLogin ? login : notlogin}
      </div>
    )
  }
}
export default Auth;