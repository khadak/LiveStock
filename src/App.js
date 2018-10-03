import React, { Component } from 'react';
import  './style/Global.scss';
import cssStyle from './style/Header.css';

import mainLogo from './images/logo.svg';
import Main from './Main'

class App extends Component {
  render() {
      return (
          <div className="page-wrapper">
            <header  className={cssStyle.header}>
                <a className={cssStyle.logo}><img src={mainLogo} alt={"mNetLogo"}/></a>
                <div className={cssStyle.caption}>Live Stock Update</div>
            </header>
            <Main />
          </div>
    );
  }
}

export default App;
