let service = require('../../service/host/index')

// 查询全部
function getData(tableName, response) {
    let sql = `SELECT * FROM ${tableName}`;
    service.getData(sql, (data) => {
        response.send(JSON.stringify(data));
    })
}

// 通过host_ids删除
function deleteDataById(tableName, ids, response) {
    let sql = `DELETE FROM ${tableName} where host_ids = ${ids}`;
    service.deleteDataById(sql, (data) => {
        response.send(JSON.stringify(data));
    })

}

// 更新
function upDateData(tableName, json, response) {
    let sql = `UPDATE ${tableName} SET name = '${json.name}', ip = '${json.ip}', port = ${json.port},login_name = '${json.login_name}',login_pwd = '${json.login_pwd}' where host_ids = '${json.host_ids}'`;
    service.upDateData(sql, (data) => {
        response.send(JSON.stringify(data));
    })
}

// 增加
function addData(tableName, json, response) {
    let sql = `INSERT INTO ${tableName} (host_ids, name, ip, port, os_type, os_version, os_arch, login_name, login_pwd) VALUES ( '${json.host_ids}', '${json.name || ''}', '${json.ip || ''}', ${json.port || ''}, '${json.os_type || ''}', '${json.os_version || ''}', '${json.os_arch || ''}', '${json.login_name || ''}', '${json.login_pwd || ''}')`;
    console.log(sql)
    service.addData(sql, (data) => {
        response.send(JSON.stringify(data));
    })
}

// 输出
module.exports = {getData, deleteDataById, upDateData, addData}