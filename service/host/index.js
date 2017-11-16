let connectDatabase = require('../../dao/index')
let getJson = require('../../util/getJson')

// 查询全部
function getData(sql, successFn, errorFn) {
    connectDatabase(sql, (res) => {
        let json = getJson('', 200, res)
        if (successFn) { successFn(json) }
    }, errorFn)
}

// 通过host_ids删除
function deleteData(sql, successFn, errorFn) {
    connectDatabase(sql, ({ affectedRows }) => {
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
function upDateData(sql, successFn, errorFn) {
    connectDatabase(sql, ({ affectedRows }) => {
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
function addData(sql, successFn, errorFn) {
    connectDatabase(sql, ({ affectedRows }) => {
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