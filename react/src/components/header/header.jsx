import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './header.less';

export default class PublicHeader extends Component {
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
  }

  state = {
    navState: false, //导航栏是否显示
  };

  // 切换左侧导航栏状态
  toggleNav = () => {
    this.setState({ navState: !this.state.navState });
  }
  backNav =()=>{
    window.history.go(-1);
  }
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {
    return (
      <header className="header-container">
        {this.props.home ? <span className="header-slide-icon iconfont" onClick={this.toggleNav}>&#xe666;</span> : <span className="header-back-icon iconfont" onClick={this.backNav}>&#xe6b0;</span>}
        <span className="header-title">{this.props.title}</span>
        {
          this.props.home&& <NavLink to="/list" exact className="header-link iconfont">&#xe621;</NavLink>
        }
        {
          this.props.confirm && <NavLink to="/" exact className="header-link header-link-confim">确定</NavLink>
        }
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="nav"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            this.state.navState && <aside key='nav-slide' className="nav-slide-list" onClick={this.toggleNav}>
              <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
              <NavLink to="/other" exact className="nav-link icon-jiantou-copy-copy">其他页面</NavLink>
              <NavLink to="/about" exact className="nav-link icon-jiantou-copy-copy">关于我们</NavLink>
            </aside>
          }
        </ReactCSSTransitionGroup>

      </header>
    );
  }
}