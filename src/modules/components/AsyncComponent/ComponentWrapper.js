import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
// import Event from '../../utils/Observable';
import store from '../../redux';
import { pageLoaded } from '../../redux/actions/pageLoaded';
import { PAGE_LOADED } from '../../redux/types';
class ComponentWrapper extends Component {
  state = {
    component: null,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    /**
     * mounting
     * updating
     */
    store.dispatch(pageLoaded(false));
    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(pageLoaded(true));
    }, 500);
    // dispatch(pageLoaded(true));
  }
  render() {
    return this.props.children;
  }
}

// export default compose(connect(state => ({
//   load: state.open
// })), withStyles(styles))(ComponentWrapper);
export default connect()(ComponentWrapper);
