import httpRequest from '../request/index'

// 注册
export function productview(data) {
    return httpRequest({
        url: '/Brand/headindex',
        method: 'post',
        data: data,
    })
}


export function topicview(data) {
    return httpRequest({
        url: '/Brand/topicindex',
        method: 'post',
        data: data,
    })
}