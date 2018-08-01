import React from 'react';

function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
}

function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
}

export default (Context) => {
    return function (mapStateToProps) {
        return function (Component) {
            return function (props) {
                return (
                    <Context.Consumer>
                        {(value) => {
                            let p = {};
                            if (mapStateToProps) {
                                if (isArray(mapStateToProps)) {
                                    mapStateToProps.forEach(i => {
                                        p[i] = value[i];
                                    })
                                } else if (isObject(mapStateToProps)) {
                                    Object.keys(mapStateToProps).forEach(i => {
                                        let k = mapStateToProps[i];
                                        p[k] = value[i];
                                    })
                                } else {
                                    p = {
                                        [mapStateToProps]: value
                                    }
                                }
                            }
                            return <Component {...props} {...p}/>
                        }}
                    </Context.Consumer>
                )
            }
        }
    }
}