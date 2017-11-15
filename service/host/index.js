let connectDatabase = require('../../dao/index')

let json = {}

// 查询全部
function getData(sql, successFn) {
    connectDatabase(sql, (res) => {
        json.data = res
        json.msg = '数据获取成功'
        json.status = 200
        if(successFn){successFn(json)}
    })
}

// 通过host_ids删除
function deleteDataById(sql, successFn) {
    connectDatabase(sql, ({affectedRows}) => {
        if (affectedRows > 0) {
            json.data = ''
            json.msg = '删除成功'
            json.status = 200
        } else {
            json.data = ''
            json.msg = '删除失败，你传的ids不对'
            json.status = 404
        }
        if(successFn){successFn(json)}
    })
}

// 更新
function upDateData(sql, successFn) {
    connectDatabase(sql, ({affectedRows}) => {
        if (affectedRows > 0) {
            json.data = ''
            json.msg = '修改成功'
            json.status = 200
        } else {
            json.data = ''
            json.msg = '修改失败'
            json.status = 404
        }
        if(successFn){successFn(json)}
    })
}

// 增加
function addData(sql, successFn) {
    connectDatabase(sql, ({affectedRows}) => {
        if (affectedRows > 0) {
            json.data = ''
            json.msg = '添加成功'
            json.status = 200
        }
        if(successFn){successFn(json)}
    })
}

// 输出
module.exports = {getData, deleteDataById, upDateData, addData}