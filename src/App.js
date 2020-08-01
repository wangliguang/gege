import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
const { TextArea } = Input;
const Bmob = require("hydrogen-js-sdk");
Bmob.initialize('7896ca43470dec5e', '123456');

export default class extends Component {

    state = {
        inputValue: '',
        message: '',
    }

    componentDidMount() {
        this.getNextMessage();
    }

    getNextMessage = async () => {
        const query = Bmob.Query("t_message");
        const beginTime = new Date('2020-08-01 00:00:00').getTime();
        const curTime = new Date().getTime();

        const randomTime = Math.floor(Math.random() * (curTime - beginTime) ) + beginTime;
        query.equalTo("createdAt", ">", this.time(randomTime));
        query.limit(1);
        const res = await query.find();
        if (res.length === 0) return;
        this.setState({
            message: res[0].message
        });
        console.log('获取成功', res);
    }

    sendNewMessage = async () => {
        if (this.state.inputValue.length === 0) {
            alert('内容不能为空');
            return;
        }
        const query = Bmob.Query('t_message');
        query.set("name", "匿名")
        query.set("message", this.state.inputValue);
        const res = await query.save();
        this.setState({ inputValue: ''});
        alert('发送成功');
    }

    time(time = +new Date()) {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
    }

    changeText = (e) => {
        if(e && e.target && e.target.value){
            let value = e.target.value;
            this.setState(function(state,prop){
                let task = Object.assign({},{...state.task},{script:value})
                return {
                    inputValue: task.script
                }
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div className="title" >333</div>

                <div className="message">{this.state.message}</div>
    
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextArea
                        value={this.state.inputValue}
                        onChange={this.changeText}
                        style={{ width: '300px', height: '100px', resize: 'none'}}
                        placeholder="to someone"
                    />
                    <button onClick={this.sendNewMessage} className="submit">发送</button>
                </div>
            
            
            </div>
        );
    }
}
