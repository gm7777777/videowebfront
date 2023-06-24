// 导入axios实例
import httpRequest from '../request/index'

// 注册
export function add(data) {
    return httpRequest({
        url: '/Intro/add',
        method: 'post',
        data: data,
    })
}

export function getById(data) {
    return httpRequest({
        url: '/Intro/caseById',
        method: 'post',
        data: data,
    })
}

export function getCases(data) {
    return httpRequest({
        url: '/Intro/caseByPage',
        method: 'post',
        data: data,
    })
}

export function treeCase(data) {
    return httpRequest({
        url: '/Intro/treecases',
        method: 'post',
        data: data,
    })
}

