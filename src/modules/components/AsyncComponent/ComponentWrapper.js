import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
// import Event from '../../utils/Observable';
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
    store.dispatch(pageLoad(false));
    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(()=>{
      dispatch(pageLoad(true));
    },500)
    // dispatch(pageLoad(true));
  }
  render() {
    return this.props.children;
  }
}

// export default compose(connect(state => ({
//   load: state.open
// })), withStyles(styles))(ComponentWrapper);
export default connect()(ComponentWrapper);
