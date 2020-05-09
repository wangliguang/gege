import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
const { TextArea } = Input;

function App() {
  return (
    <div className="App">
      <TextArea
          style={{ width: 400, height: 200, resize: 'none'}}
          placeholder="to someone"
          autoSize={false}
        />
    </div>
  );
}

export default App;
