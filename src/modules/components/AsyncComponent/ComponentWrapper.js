import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import store from '../../redux';
import { pageLoad } from '../../redux/actions/pageLoad';
import { PAGE_LOAD } from '../../redux/actionTypes';
class ComponentWrapper extends Component {
  state = {
    component: null,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    /**
     * mounting
     * updating
     */
    // console.log('getDerivedStateFromProps')
    // store.dispatch(pageLoad(false));
    // return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageLoad(true));
    console.log('store===d', dispatch === store.dispatch);
  }
  render() {
    return this.props.children;
  }
}

// export default compose(connect(state => ({
//   load: state.open
// })), withStyles(styles))(ComponentWrapper);
export default connect()(ComponentWrapper);
