import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import LogoutIcon from 'material-ui/svg-icons/action/eject';
import decode from 'jwt-decode';

import pi from '../../drawables/pi.svg';
import '../../styles/App.css';

const styles = {
  color: {
    primary: "#2196f4",
    black: "#000000",
    white: "#ffffff"
  }
};

class AppNav extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    let token = localStorage.getItem('jwtPIoT') || null;
    let decoded = token && decode(token);

    this.setState(decoded);
    this.setState({ active: this.props.location.pathname });
  }

  navLinks() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MenuIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Dashboard" containerElement={<Link to="/" />} />
        <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
        { this.state.admin && (
        <MenuItem primaryText="Admin" containerElement={<Link to="/admin" />} />
        )}
        <MenuItem primaryText="Sign out" leftIcon={<LogoutIcon />} onClick={this.logout} />
      </IconMenu>
    )
  }

  logout() {
    localStorage.removeItem('jwtPIoT');
    this.props.history.push('/login');
  }

  render() {
    return (
      <AppBar
        title="PIoT"
        iconElementLeft={<img src={pi} className="nav-logo" alt="PIoT" />}
        iconStyleLeft={{}}
        iconElementRight={this.navLinks()}
        style={{
          backgroundColor: styles.color.black,
          maxHeight: "75px",
          alignItems: "center"
        }}
      />
    );
  }
}

export default withRouter(AppNav);