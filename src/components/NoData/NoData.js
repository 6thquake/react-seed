import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@6thquake/react-material/styles';
import TableRow from '@6thquake/react-material/TableRow';
import TableCell from '@6thquake/react-material/TableCell';
import Grid from '@6thquake/react-material/Grid';
import classnames from 'classnames';
import {withLocale} from '@6thquake/react-material/LocaleProvider';
import Icon from './Icon';
import omit from '../../util/omit';
import compose from 'recompose/compose';

const style = theme => ({
    td: {
        padding: '10px'
    },
    item: {},
    tip: {
        textAlign: 'center'
    },
    iconRoot: {
        width: '100%',
        height: '100%'
    },
    xs: {
        width: '150px'
    },
    sm: {
        width: '200px'
    },
    md: {
        width: '250px'
    },
    lg: {
        width: '300px'
    },
    xl: {
        width: '350px'
    }
});

class NoData extends Component {
    state = {
        tip: '暂无数据',
        sizes: ['xs', 'sm', 'md', 'lg', 'xl']
    };

    static getDerivedStateFromProps(props, state) {
        const {locales, tip} = props;
        return {
            tip: tip || locales['label.NoDatayet']
        }
    }

    render() {
        const {sizes, tip} = this.state;
        const {classes, colSpan, visible, size, ...rest} = this.props;
        const itemClassName = classnames({
            [classes[size]]: sizes.includes(size)
        }, classes.item);

        const restProps = omit(rest, ['changeLocale', 'locale', 'locales']);

        return (
            visible &&
            <TableRow>
                <TableCell colSpan={colSpan} className={classes.td} {...restProps}>
                    <Grid container direction="column" spacing={24} justify="center" alignItems="center">
                        <Grid item className={itemClassName}>
                            <Icon classes={{root: classes.iconRoot}}/>
                        </Grid>
                        <Grid item className={classes.tip}>
                            {tip}
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
        )
    }
}

NoData.propTypes = {
    classes: PropTypes.object.isRequired,
    colSpan: PropTypes.number,
    visible: PropTypes.bool,
    tip: PropTypes.any,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

NoData.defaultProps = {
    colSpan: 1, //列数
    visible: false,
    tip: '',
    size: 'md'
};

export default compose(withLocale({name: 'ehr'}), withStyles(style))(NoData);
