import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
const { TextArea } = Input;

export default class extends Component {

    state = {
        inputValue: '',
        message: 'xxxx',
    }

    changeText = (e) => {
        this.setState({
            inputValue: e.currentTarget.innerHTML,
        });
    }

    submit = () => {
        console.log('XXXX', this.state.inputValue);
    }

    render() {
        return (
            <div className="App">
                <div className="title" >有时，不是不想说，不是没人说，而是想没有压力的说，如果这里能承载你的部分宣泄，便是我的幸运</div>

                <div className="message">{this.state.message}</div>
    
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextArea
                        onChange={this.changeText}
                        style={{ width: '300px', height: '100px', resize: 'none'}}
                        placeholder="to someone"
                    />
                    <button onClick={this.submit} className="submit">发送</button>
                </div>
            
            
            </div>
        );
    }
}
