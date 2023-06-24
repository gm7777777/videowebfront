import updservice from '../request/indexform'
import httpRequest from '../request/index'

export function upload(data) {
    return updservice({
        url: '/File/upload',
        method: 'post',
        data: data,
    })
}


export function download(id,data) {
    return updservice({
        url: '/File/download/'+id,
        method: 'post',
        data: data,
    })
}

export function files(data) {
    return httpRequest({
        url: '/File/getFilesByTopic',
        method: 'post',
        data: data,
    })
}

export function remove(data) {
    return httpRequest({
        url: '/File/remove',
        method: 'post',
        data: data,
    })
}
