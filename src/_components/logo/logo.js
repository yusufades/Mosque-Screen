import React, { Component } from 'react';
import './logo.css';
import AppConfig from '../app-config/app-config';
import ICV_Logo from '../../_assets/ICV_logo.png';

class Logo extends Component {
  constructor(props) {
    super(props);
    var _appConfig = new AppConfig();
    this.state = {
      logo_enabled: _appConfig.get('enable_logo').toLowerCase() === 'true',
      logo: _appConfig.get('Logo_URL')
    };
  }

  render() {
    return (
      <div className="LogoWrapper d-none d-lg-block">
        {this.state.logo_enabled ? (
          <img src={this.state.logo || ICV_Logo} alt="" />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Logo;
