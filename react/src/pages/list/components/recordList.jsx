import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import API from '@/api/api';
import './recordList.less';

class RecordList extends Component{
  
  state = {
    list: [],
  }
  
  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  getRecord = async type => {
    try{
      let rs = await API.getList({offset:0,limit:20,tab:type});
      this.setState({list: rs.data||[]})
    }catch(err){
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps){
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2];
    let type = nextProps.location.pathname.split('/')[2];
    if(currenType !== type){
      this.getRecord(type);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount(){
    let type = this.props.location.pathname.split('/')[2];
    this.getRecord(type);
  }

  render(){
    return (
      <div>
        <ul className="record-list-con">
        {
          this.state.list.map((item, $index) => {
            return <li className="record-item" key={$index}>
              <section className="record-item-header">
                <span>创建时间：{item.update_time}</span>
                <span>{item.update_user}</span>
              </section>
              <section className="record-item-content">
                <p><span>标题：</span>{item.title}</p>
                <p><span>子标题：</span>{item.sub_title}</p>
              </section>
            </li>
          })
        }
        </ul>
      </div>
    );
  }

}

export default RecordList;