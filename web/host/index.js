let service = require('../../service/host/index')
// var fork = require('child_process').fork;
// var spawn = require('child_process').spawn;

// 查询全部或者单个host_ids
function getData(host_ids, response, next) {
    service.getData(host_ids, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 通过host_ids删除
function deleteDataById(host_ids, response, next) {
    service.deleteData(host_ids, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}


// 批量删除
function deleteDataBatch(idsArr, response, next) {
    service.deleteData(idsArr, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 更新
function upDateData(json, response, next) {
    service.upDateData(json, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 增加
function addData(json, response, next) {
    service.addData(json, (data) => {
        response.send(JSON.stringify(data));
    }, o => {
        next()
    })
}

// 输出
module.exports = { getData, deleteDataById, deleteDataBatch, upDateData, addData }