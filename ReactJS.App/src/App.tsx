import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { ManufacturerEditor } from './components/ManufacturerEditor';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ManufacturerEditor object_id='25' is_new={false} />
      </div>
    );
  }
}

export default App;
