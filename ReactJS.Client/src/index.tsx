import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MainPage} from './components/MainPage';
import {globalConfig} from './components/Types';

// Need waiting to ensure all configs are loaded
setTimeout(function() {  
  console.log(globalConfig.getServerURL());
  if (globalConfig.getServerURL()!=null) {
    ReactDOM.render(
      <MainPage />,
      document.getElementById('root') as HTMLElement
    );  
  }  
}, 1000);



