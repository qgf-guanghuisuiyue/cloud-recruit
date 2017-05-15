import React, {Component} from 'react';

import {Radio,Input,DatePicker} from 'antd';
const RadioGroup = Radio.Group;

import radioData from 'data/resume-radio.json';

// lodash 
import chunk from 'lodash/chunk';

import TagsComponent from './tags';
import InputComponents from './input';

export default class SubscribeComponents extends Component {

    state = {
        statusid: '1'
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
    }

    getFormData = () => {
        let data = {},
        thelable = '',
        {tags} = this.refs.Tags.state,
            {statusid} = this.state;
        if(tags.length > 0){
            thelable = tags.join(',');
        }
        if(statusid === '10' || statusid === '11'){
            data = this.refs.Event.getFormData();
        }
        if(!data){
            return false;
        }
        return {statusid,thelable,...data};
    }
    

    render() {
        const {statusid} = this.state;
        let data = chunk(radioData,4);
        return (
            <div>
                <RadioGroup style={{display:'table'}} onChange={this.onChange} value={statusid}>
                    {
                        data.map((item,index)=>{
                            return (
                                <div key={index} className="table-row">
                                    {
                                        item.map((val,key)=>{
                                            return (
                                                <div key={key} className="table-cell">
                                                    <Radio 
                                                        value={val.value}
                                                    >{val.name}</Radio>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </RadioGroup>
                {(statusid === '10' || statusid === '11') && 
                    <InputComponents 
                        ref="Event"
                        timePlaceholder={statusid === '10' ? '面试时间' : '预约时间'}
                        addressPlaceholder={statusid === '10' ? '面试地点' : '预约地点'}
                    />
                }
                <TagsComponent ref='Tags' currentStage={this.props.currentStage} />
            </div>
        );
    }
}