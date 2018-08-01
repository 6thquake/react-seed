export default ((prefix, config) => {
    return Object.keys(config).reduce((copy, name) => {
        copy[name] = `${prefix}${config[name]}`;
        return copy
    }, {})
})