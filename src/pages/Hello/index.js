import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import StateManager from '$core/state/StateManager';

import Url from '$utils/Url';
import LocationManager from '$utils/Location';

import { renderRoutes } from '$components/Router';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {},
});

class Hello extends React.Component {
  constructor(props) {
    super(props);

    StateManager.getInstance().setProperties('default', {
      page: 1,
      pageSize: 10,
    });
  }

  render() {
    let $location = LocationManager.getLocation();
    let initialUrl = (global || window).location.href;
    $location.$$parseLinkUrl(initialUrl, initialUrl);
    let hash = {
      path: $location.path(),
      params: $location.search(),
      hash: $location.hash(),
    };

    let stateManager = StateManager.getInstance();

    stateManager.setProperties('default', {
      e: 5,
    });
    stateManager.updateProperties('default', {
      e: 55,
      ee: 555,
    });
    stateManager.removeProperty('ee');

    stateManager.setProperties('local', {
      d: 4,
    });
    stateManager.updateProperties('local', {
      d: 44,
      dd: 444,
    });
    stateManager.removeProperty('dd');

    stateManager.setProperties('session', {
      c: 3,
    });
    stateManager.updateProperties('session', {
      c: 33,
      cc: 333,
    });
    stateManager.removeProperty('cc');

    let properties = stateManager.getProperties();

    let a = stateManager.getProperty('a');
    let b = stateManager.getProperty('b');
    let c = stateManager.getProperty('c');
    let d = stateManager.getProperty('d');
    let e = stateManager.getProperty('e');

    const { route } = this.props;

    return (
      <React.Fragment>
        <h1>Hello world! I am page 1.</h1>
        <br />
        <p>{JSON.stringify(properties)}</p>
        <br />
        <p>
          {a}, {b}, {c}, {d}, {e}
        </p>
        <br />
        <p>{JSON.stringify(hash)}</p>
        <fieldset>{renderRoutes(route.routes)}</fieldset>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        test scrollbar
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withLocale({ name: 'Hello' })(withRouter(Hello)));
