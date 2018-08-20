import React, { Component } from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import Grid from '@6thquake/react-material/Grid';
import SvgIcon from '@6thquake/react-material/SvgIcon';
import omit from '$utils/omit';

const style = theme => ({
  container: {
    height: 'calc(100% - 64px)',
  },
  iconRoot: {
    width: '400px',
    height: '100%',
  },
});

class Forbidden extends Component {
  render() {
    const { classes } = this.props;
    const logoClass = omit(classes, ['container']);

    return (
      <Grid
        container
        classes={{ container: classes.container }}
        direction="column"
        spacing={24}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <SvgIcon viewBox="0 0 324 184" classes={{ root: classes.iconRoot, ...logoClass }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-833.000000, -186.000000)">
                <g transform="translate(837.000000, 151.000000)">
                  <ellipse
                    stroke="#DEEFFE"
                    transform="translate(163.485397, 124.900545) rotate(23.000000) translate(-163.485397, -124.900545) "
                    cx="163.485397"
                    cy="124.900545"
                    rx="146.383568"
                    ry="73.5508651"
                  />
                  <circle fill="#E3F2FD" cx="25.5" cy="77.5" r="2.5" />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="228.5"
                    cy="214.5"
                    r="3.5"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="123"
                    cy="38"
                    r="2"
                  />
                  <path
                    d="M302.865787,130.707392 C307.052181,133.12409 310.408013,136.4248 312.899805,140.578121 C316.075724,145.700569 317.664,151.490093 317.664,157.904 C317.664,168.035937 313.672519,176.122574 305.772385,181.970705 C298.586755,187.334626 289.38367,190 278.224,190 C257.268955,190 244.341619,180.71489 239.990157,162.398272 L239.558289,160.580408 L258.2301,154.779457 L258.716305,156.876219 C260.156873,163.088665 262.347659,167.251158 265.1829,169.419284 C268.052518,171.613698 272.386823,172.752 278.224,172.752 C284.436802,172.752 289.340273,171.338387 293.013978,168.539534 C296.636548,165.843668 298.4,162.357774 298.4,157.904 C298.4,146.356883 292.690895,140.896 280.528,140.896 L263.264,140.896 L263.264,124.224 L281.392,124.224 C285.050669,124.224 288.225593,122.780853 291.003942,119.834462 C293.724136,116.85925 295.088,113.023382 295.088,108.224 C295.088,100.143343 290.078538,96.256 279.088,96.256 C268.201238,96.256 262.140747,100.801368 260.315231,110.189739 L259.898513,112.332859 L241.500915,107.05038 L241.843516,105.256762 C245.298254,87.1701939 257.92015,78 279.088,78 C289.333586,78 297.716657,80.7435505 304.151533,86.259161 C310.741624,91.9225203 314.064,99.2940414 314.064,108.224 C314.064,117.504027 310.294152,125.047341 302.865787,130.707392 Z"
                    id="3"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    fill="#E3F2FD"
                  />
                  <path
                    d="M64.568,164.944 L64.568,188.848 L45.88,188.848 L45.88,164.944 L-1.784,164.944 L-1.784,149.627577 L48.5827652,79.584 L64.568,79.584 L64.568,147.12 L77.384,147.12 L77.384,164.944 L64.568,164.944 Z M45.88,147.12 L45.88,113.682506 L21.6985598,147.12 L45.88,147.12 Z"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    fill="#E3F2FD"
                  />
                  <circle fill="#E3F2FD" cx="157" cy="131" r="50" />
                  <rect fill="#FFFFFF" x="131" y="127" width="53" height="9" rx="4.5" />
                </g>
              </g>
            </g>
          </SvgIcon>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(Forbidden);
