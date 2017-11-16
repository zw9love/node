let service = require('../../service/host/index')

let tableName = 'beeeye_host'

// 查询全部或者单个host_ids
function getData(host_ids, response, next) {
    let sql = ''
    if (host_ids === null || host_ids === undefined){
        sql = `SELECT * FROM ${tableName}`;
    }else{
        sql = `SELECT * FROM ${tableName} where host_ids = '${host_ids}'`;
    }
    service.getData(sql, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 通过host_ids删除
function deleteDataById(host_ids, response, next) {
    let sql = `DELETE FROM ${tableName} where host_ids = '${host_ids}'`;
    service.deleteData(sql, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}


// 批量删除
function deleteDataBatch(idsArr, response, next) {
    let sql = `DELETE FROM ${tableName} where host_ids in (${idsArr})`;
    console.log(sql)
    service.deleteData(sql, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 更新
function upDateData(json, response, next) {
    let sql = `UPDATE ${tableName} SET name = '${json.name}', ip = '${json.ip}', port = ${json.port},login_name = '${json.login_name}',login_pwd = '${json.login_pwd}' where host_ids = '${json.host_ids}'`;
    service.upDateData(sql, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 增加
function addData(json, response, next) {
    let sql = `INSERT INTO ${tableName} (host_ids, name, ip, port, os_type, os_version, os_arch, login_name, login_pwd) VALUES ( '${json.host_ids}', '${json.name || ''}', '${json.ip || ''}', ${json.port || ''}, '${json.os_type || ''}', '${json.os_version || ''}', '${json.os_arch || ''}', '${json.login_name || ''}', '${json.login_pwd || ''}')`;
    console.log(sql)
    service.addData(sql, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 输出
module.exports = { getData, deleteDataById, deleteDataBatch, upDateData, addData}