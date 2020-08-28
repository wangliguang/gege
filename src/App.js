import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
const { TextArea } = Input;
const Bmob = require("hydrogen-js-sdk");
Bmob.initialize('7896ca43470dec5e', '123456');

export default class extends Component {
    allData = [];
    state = {
        inputValue: '',
        message: '',
    }

    componentDidMount() {
        this.get100Message();
    }

    get100Message = async () => {
        const query = Bmob.Query("t_message");
        const beginTime = 1596211200000; // 2020-08-01 00:00:00
        const curTime = new Date().getTime();

        const randomTime = Math.floor(Math.random() * (curTime - beginTime) ) + beginTime;
        query.equalTo("createdAt", ">", this.time(randomTime));
        query.limit(100);
        const res = await query.find();
        if (res.length === 0) return;
        this.allData = res;
        this.getNextMessage();
    }

    getNextMessage = () => {
        const index = Math.floor(Math.random() * this.allData.length);
        this.setState({
            message: this.allData[index].message,
        });
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

    time(time) {
        function add0(m){return m<10?'0'+m:m }
        var  date = new Date(time);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = add0(date.getDate()) + ' ';
        var h = add0(date.getHours()) + ':';
        var m = add0(date.getMinutes()) + ':';
        var s = add0(date.getSeconds());
        
        return Y+M+D+h+m+s;
    }

    changeText = (e) => {
        // 2020-08-6 11:49:7
        if(e && e.target && e.target.value){
            let value = e.target.value;
            console.log(value);
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
                <div className="title" >
                    <div style={{ }}>不知从什么时候开始，想聊些心里话，貌似已经找不到没有合适的渠道。找家人担心家人操心；找朋友担心打扰人家；发圈要检查屏蔽某些人；发微博担心有人抬杠；听音乐有感而发也被调侃网抑云</div>
                    <div style={{ marginTop: 20 }}>而在这里，没有人认识你，没有抬杠，没有点赞，只为你倾诉</div>
                    <div style={{ marginTop: 20 }}>如果24小时内没有人发言，该网站将禁止发布，只允许浏览，一个月后该网站关闭数据清空，正如我轻轻的来，最后又轻轻的走，挥一挥衣袖，不带走一片云彩</div>
                </div>

                <div className="messageWraper">
                    <div className='message'>{this.state.message}</div>
                    <button onClick={this.getNextMessage} className="submit">下一条</button>
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextArea
                        value={this.state.inputValue}
                        onChange={this.changeText}
                        maxLength={200}
                        className="input"
                        placeholder="请大家共同维护我们这一片净土，感谢你的信任"
                    />
                    <div style={{ color: 'gray', alignSelf: 'flex-end', marginTop: 10 }}>{`${this.state.inputValue.length}/300`}</div>
                    <button onClick={this.sendNewMessage} style={{ marginTop: "20px"}} className="submit">发送</button>
                </div>

                <div className="email">wangliguang_ios@163.com</div>
            </div>
        );
    }
}
