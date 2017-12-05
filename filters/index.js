function autoGetData(val) {
    if (val || val === 0) {
        return val
    } else {
        return ''
    }
}

exports = module.exports = {
    autoGetData
}