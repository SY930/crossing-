import axios from '.';
export function getChartData(values) {
    if (values) {
        return axios.get(`/api/queryPrice?exchange=${values.exchange}&cType=${values.cType}&sType=${values.sType}&grpType=${values.grpType}`);
    }
    return axios.get('/api/queryPrice');
}

export function getChart2Data(values) {
    if (values) {
        return axios.get(`/api/queryQty?exchange=${values.exchange}&cType=${values.cType}&sType=${values.sType}&grpType=${values.grpType}`);
    }
    return axios.get('/api/queryQty');
}

export function getChart3Data(values) {
    if (values) {
        return axios.get(`/api/queryBps?exchange=${values.exchange}&&cType=${values.cType}&sType=${values.sType}&bps=${values.bps}&grpType=${values.grpType}`);
    }
    return axios.get('/api/queryBps');
}
export function getChart4Data(values) {
    if (values) {
        return axios.get(`/api/queryBtc?exchange=${values.exchange}&cType=${values.cType}&sType=${values.sType}&btc=${values.btc}&grpType=${values.grpType}`);
    }
    return axios.get('/api/queryBtc');
}

export function getChartOneData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=1&type=1&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=1&type=1')
}

export function getChartTwoData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=1&type=2&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=1&type=2')
}

export function getChartThreeData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=1&type=3&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=1&type=3')
}

export function getChartFourData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=0&type=1&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=0&type=1')
}

export function getChartFiveData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=0&type=2&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=0&type=2')
}

export function getChartSixData(values) {
    if (values) {
        return axios.get(`/api/queryIncrement?cType=0&type=3&grpType=${values.grpType}`)
    }
    return axios.get('/api/queryIncrement?cType=0&type=3')
}

export function getRateData(values) {
    if (values) {
        return axios.get(`/api/getCurrency?grpType=${values.grpType}`)
    }
    return axios.get('/api/getCurrency')
}