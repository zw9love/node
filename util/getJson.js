function getJson(msg = '', status, data = null){
    let json = {
        data: data,
        msg:msg,
        status:status
    }
    return json
}

exports = module.exports = getJson