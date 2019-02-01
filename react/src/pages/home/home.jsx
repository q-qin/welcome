import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import API from '@/api/api';
import { saveFormData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import './home.less';

class Home extends Component {
  static propTypes = {
    /** 必要验证 */
    // formData: PropTypes.object.isRequired,
    // saveFormData: PropTypes.func.isRequired,
    // clearSelected: PropTypes.func.isRequired,
  }

  state = {
    alertStatus: false, //弹框状态
    alertTip: '', //弹框提示文字
    formData:{},
  }
  /**
   * 已选择的商品数据
   * @type {Array}
   */
  selectedProList = []; 

  // 提交
  sumitForm = () => {
    let alertTip = '你点了提交';
    this.setState({
      alertStatus: true,
      alertTip,
    })
  }
  
  // 关闭弹款
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: '',
    })
  }
  
  // 初始化数据，获取已选择的商品
  initData = props => {
    this.selectedProList = [];
    
  }


  componentWillReceiveProps(nextProps){
    // 
    console.log('componentWillReceiveProps',nextProps)
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate',nextProps,nextState)
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){
    console.log('componentWillMount',this.props)
    this.initData(this.props);
  }
  

  render() {
    console.log('render')
    return (
      <main className="home-container">
        <PublicHeader title='首页' home />
        <p className="common-title">这是首页</p>
        <TouchableOpacity className="submit-btn" clickCallBack={this.sumitForm} text="提交" />
        <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
      </main>
    );
  }
}

/*** redux */ 
// export default connect(state => ({
//   formData: state.formData,
//   proData: state.proData,
// }), {
//   saveFormData, 
//   clearSelected,
// })(Home);

export default Home


