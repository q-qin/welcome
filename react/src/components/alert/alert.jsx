import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import './alert.less';

export default class Alert extends Component{
  static propTypes = {
    closeAlert: PropTypes.func.isRequired,
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired,
  }
  // 关闭弹框
  confirm = () => {
    console.log('confirm')
    this.props.closeAlert();
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  
  render(){
    return (
      <div>
        {
          this.props.alertStatus&&<div className="alert-con">
            <div className="alert-context">
              <div className="alert-content-detail">{this.props.alertTip}</div>
              <TouchableOpacity className="confirm-btn" clickCallBack={this.confirm}/>
            </div>
          </div>
        }
      </div>
    );
  }
}