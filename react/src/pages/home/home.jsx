import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import API from '@/api/api';
import envconfig from '@/envconfig/envconfig';
import { saveFormData, saveImg, clearData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import './home.less';

class Home extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImg: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired,
  }

  state = {
    alertStatus: false, //弹框状态
    alertTip: '', //弹框提示文字
  }
  /**
   * 已选择的商品数据
   * @type {Array}
   */
  selectedProList = []; 

  /**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (type, event) => {
    let value = event.target.value;
    switch(type){
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
        value = value.replace(/\D/g, '');
      break;
      default:;
    }
    this.props.saveFormData(value, type);
  }
  
  /*
  上传图片，并将图片地址存到redux，保留状态
   */
  uploadImg = async event => {
    try{
      let formdata = new FormData();
      formdata.append('file', event.target.files[0]);
      let result = await API.uploadImg({data: formdata});
      this.props.saveImg(envconfig.imgUrl + result.image_path);
      console.log(result);
    }catch(err){
      console.error(err);
    }
  }

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
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selectNum){
        this.selectedProList.push(item);
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){
    this.initData(this.props);
  }
  

  render() {
    
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

export default connect(state => ({
  formData: state.formData,
  proData: state.proData,
}), {
  saveFormData, 
  saveImg,
  clearData,
  clearSelected,
})(Home);
