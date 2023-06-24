// 导入axios实例
import httpRequest from '../request/index'

// 注册
export function docs(data) {
    return httpRequest({
        url: '/Reader/docs',
        method: 'post',
        data: data,
    })
}

export function addDoc(data) {
    return httpRequest({
        url: '/Reader/add',
        method: 'post',
        data: data,
    })
}