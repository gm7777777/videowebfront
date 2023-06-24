import service from '../request/index'

export function getSectors(data) {
    return service({
        url: '/Intro/sectors',
        method: 'post',
        data: data,
    })
}