let { connectDatabase, connectDatabaseTransaction } = require('../../dao/index')
let { getJson } = require('../../util/index')
let { autoGetData } = require('../../filters/index')
let tableName = 'beeeye_host'

// 查询全部
function getData(data, successFn, errorFn) {
    let host_ids = data
    let sql = ''
    if (host_ids === null || host_ids === undefined) {
        sql = `SELECT * FROM ${tableName}`;
    } else {
        sql = `SELECT * FROM ${tableName} where host_ids = ?`;
    }

    connectDatabase(sql, data, (res) => {
        let json = getJson('', 200, res)
        if (successFn) { successFn(json) }
    }, errorFn)
}

// (删除 / 批量删除)
function deleteData(idsArr, successFn, errorFn) {
    let sql = idsArr.length >= 0 ? `DELETE FROM ${tableName} where host_ids in (?)` : `DELETE FROM ${tableName} where host_ids = ?`;
    connectDatabase(sql, idsArr, ({ affectedRows }) => {
        let json
        if (affectedRows > 0) {
            json = getJson('删除成功', 200)
        } else {
            json = getJson('删除失败', 404)
        }
        if (successFn) { successFn(json) }
    }, errorFn)
}

// 更新
function upDateData(json, successFn, errorFn) {
    let sql = `UPDATE ${tableName} SET name = ?, ip = ?, port = ?,login_name = ?,login_pwd = ? where host_ids = ?`;
    let arr = [json.name, json.ip, json.port, json.login_name, json.login_pwd, json.host_ids]
    connectDatabase(sql, arr, ({ affectedRows }) => {
        let json
        if (affectedRows > 0) {
            json = getJson('修改成功', 200)
        } else {
            json = getJson('修改失败', 404)
        }
        if (successFn) { successFn(json) }
    }, errorFn)
}

// 增加
function addData(json, successFn, errorFn) {
    let sql = `INSERT INTO ${tableName} (host_ids, name, ip, port, os_type, os_version, os_arch, login_name, login_pwd) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let arr = [json.host_ids, autoGetData(json.name), autoGetData(json.ip), autoGetData(json.port), autoGetData(json.os_type), autoGetData(json.os_version), autoGetData(json.os_arch), autoGetData(json.login_name), autoGetData(json.login_pwd)]
    connectDatabase(sql, arr, ({ affectedRows }) => {
        let json
        if (affectedRows > 0) {
            json = getJson('添加成功', 200)
        } else {
            json = getJson('添加失败', 404)
        }
        if (successFn) { successFn(json) }
    }, errorFn)
}

// 输出
module.exports = { getData, deleteData, upDateData, addData }