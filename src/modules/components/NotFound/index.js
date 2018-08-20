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

class NotFound extends Component {
  renderRoot() {
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
          <SvgIcon viewBox="0 0 317 188" classes={{ root: classes.iconRoot, ...logoClass }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-440.000000, -194.000000)">
                <g transform="translate(431.000000, 194.000000)">
                  <path
                    d="M225.627309,105.980068 L217.231057,99.9644842 C217.963777,96.5919304 218.348155,93.0878231 218.348155,89.4880406 C218.348155,62.1607876 196.090278,40 168.643301,40 C159.202021,40 150.373344,42.6191109 142.865965,47.1756463 L135.71894,42.0450592 C134.433677,41.1241846 132.643918,41.4231698 131.719009,42.6908674 C130.7941,43.9705243 131.094395,45.7524764 132.367647,46.6733511 L137.881066,50.6319159 C135.286515,52.6650157 132.908178,54.9612225 130.782088,57.4607393 L121.701163,50.95482 C119.635132,49.4718531 116.716263,49.9382701 115.226799,52.0072481 C113.737335,54.0642667 114.205796,56.9704035 116.283838,58.4533704 L125.448846,65.0310461 C124.151571,67.2913747 123.034473,69.6473786 122.109564,72.1110172 L113.401005,65.8682049 C110.746396,63.9666586 107.022736,64.5765885 105.112858,67.2076589 C103.202981,69.8506886 103.815583,73.5581058 106.458181,75.4596521 L119.190695,84.5966417 C119.034542,86.2111621 118.950459,87.8496014 118.950459,89.5119594 C118.950459,116.839212 141.208336,139 168.655313,139 C182.853268,139 195.645841,133.080092 204.702743,123.58432 L212.498405,129.169365 C215.153014,131.070911 218.876674,130.460981 220.786552,127.829911 C222.696429,125.186881 222.083827,121.479464 219.441229,119.577917 L211.801721,114.100507 C213.159055,111.756463 214.312188,109.280865 215.273133,106.721551 L221.759508,111.373762 C223.23696,112.438149 225.315002,112.103286 226.384053,110.620319 C227.441092,109.113433 227.104762,107.044455 225.627309,105.980068 Z M106,47.5 C106,49.4329966 107.567003,51 109.5,51 C111.432997,51 113,49.4329966 113,47.5 C113,45.5670034 111.432997,44 109.5,44 C107.567003,44 106,45.5670034 106,47.5 Z M210,46.5 C210,47.8807119 211.119288,49 212.5,49 C213.880712,49 215,47.8807119 215,46.5 C215,45.1192881 213.880712,44 212.5,44 C211.119288,44 210,45.1192881 210,46.5 Z M204.123371,40.9778481 C204.256324,40.9889241 204.378197,41 204.50007,41 C206.261692,41 207.779567,39.6708861 207.978996,37.8765823 C208.189504,35.9493671 206.793502,34.2325949 204.876769,34.0221519 C204.743817,34.0110759 204.621943,34 204.50007,34 C202.738448,34 201.220573,35.3291139 201.021144,37.1234177 C200.810636,39.039557 202.195559,40.7674051 204.123371,40.9778481 Z M202.016356,37.2356833 C202.144972,35.964292 203.217352,34.9974888 204.496174,35.0000049 C204.584345,35.0000049 204.683538,35.0000049 204.771709,35.0110181 C205.432993,35.0881105 206.02815,35.4074931 206.446963,35.9251132 C206.865777,36.4427333 207.053141,37.0925118 206.987012,37.7643167 C206.858396,39.035708 205.786017,40.0025112 204.507195,39.9999951 C204.419024,39.9999951 204.319831,39.9999951 204.23166,39.9889819 C203.570375,39.9118895 202.975219,39.5925069 202.556405,39.0748868 C202.137591,38.5572667 201.939206,37.896475 202.016356,37.2356833 Z"
                    fill="#E3F2FD"
                    fillRule="nonzero"
                  />
                  <text
                    fontFamily="LiHeiPro, LiHei Pro"
                    fontSize="144"
                    fontWeight="400"
                    fill="#E3F2FD"
                  >
                    <tspan x="241" y="145">
                      4
                    </tspan>
                  </text>
                  <text
                    fontFamily="LiHeiPro, LiHei Pro"
                    fontSize="144"
                    fontWeight="400"
                    fill="#E3F2FD"
                  >
                    <tspan x="0" y="145">
                      4
                    </tspan>
                  </text>
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#FFFFFF"
                    cx="166"
                    cy="67"
                    r="5"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#FFFFFF"
                    cx="198.5"
                    cy="62.5"
                    r="2.5"
                  />
                  <circle fill="#E3F2FD" cx="86.5" cy="8.5" r="2.5" />
                  <circle fill="#E3F2FD" cx="118.5" cy="129.5" r="4.5" />
                  <circle fill="#E3F2FD" cx="168.5" cy="180.5" r="2.5" />
                  <circle fill="#E3F2FD" cx="203.5" cy="159.5" r="2.5" />
                  <circle fill="#E3F2FD" cx="249.5" cy="57.5" r="2.5" />
                  <circle fill="#E3F2FD" cx="243.5" cy="157.5" r="2.5" />
                  <circle fill="#E3F2FD" cx="186" cy="13" r="2" />
                  <circle fill="#E3F2FD" cx="245" cy="2" r="2" />
                  <circle fill="#E3F2FD" cx="92" cy="157" r="2" />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="163.5"
                    cy="26.5"
                    r="2.5"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="230.5"
                    cy="24.5"
                    r="3.5"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="84.5"
                    cy="97.5"
                    r="2.5"
                  />
                  <circle stroke="#BBDEFB" strokeWidth="1.6" fill="#E3F2FD" cx="137" cy="4" r="2" />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="148"
                    cy="163"
                    r="2"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="112"
                    cy="183"
                    r="2"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#E3F2FD"
                    cx="233"
                    cy="185"
                    r="2"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#FFFFFF"
                    cx="148"
                    cy="91"
                    r="9"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#FFFFFF"
                    cx="189.5"
                    cy="97.5"
                    r="4.5"
                  />
                  <circle
                    stroke="#BBDEFB"
                    strokeWidth="1.6"
                    fill="#FFFFFF"
                    cx="165.5"
                    cy="109.5"
                    r="4.5"
                  />
                </g>
              </g>
            </g>
          </SvgIcon>
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderRoot();
  }
}

export default withStyles(style)(NotFound);
