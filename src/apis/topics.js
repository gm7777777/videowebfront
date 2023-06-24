import httpRequest from '../request/index'


export function getQues(data) {
    return httpRequest({
        url: '/AskAnswer/getQues',
        method: 'post',
        data: data,
    })
}

export function addQues(data) {
    return httpRequest({
        url: '/AskAnswer/addTopic',
        method: 'post',
        data: data,
    })
}

export function updQues(data) {
    return httpRequest({
        url: '/AskAnswer/updTopic',
        method: 'post',
        data: data,
    })
}

export function getRemarks(data) {
    return httpRequest({
        url: '/AskAnswer/getRemarks',
        method: 'post',
        data: data,
    })
}

export function addRemarks(data) {
    return httpRequest({
        url: '/AskAnswer/addRemark',
        method: 'post',
        data: data,
    })
}

export function getById(data) {
    return httpRequest({
        url: '/AskAnswer/getQuesById',
        method: 'post',
        data: data,
    })
}