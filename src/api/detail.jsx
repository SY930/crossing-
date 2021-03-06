import axios from '.';
export function getSymbols() {
    return axios.get('/api/getSymbols');
}

export function BuyOrder(values){
    let userName = localStorage.getItem('layui');
    if (userName) {
        const token = JSON.parse(userName).token;
        userName = JSON.parse(token).userName;
    }
    return axios.post(`/api/order?price=${values.price}&tradeType=1&amount=${values.amount}&symbol=${values.symbol}&orderType=1&userKey=${userName || 1234}&exAccount=0000000`)
}

export function SellOrder(values){
    let userName = localStorage.getItem('layui');
    if (userName) {
        const token = JSON.parse(userName).token;
        userName = JSON.parse(token).userName;
    }
    return axios.post(`/api/order?price=${values.price1}&tradeType=2&amount=${values.amount1}&symbol=${values.symbol}&orderType=2&userKey=${userName || 1234}&exAccount=0000000`)
}

export function GetOrders(url) {
    return axios.get(url);
}

export function RecallOrder(values) {
    let userName = localStorage.getItem('layui');
    if (userName) {
        const token = JSON.parse(userName).token;
        userName = JSON.parse(token).userName;
    }
    return axios.post(`/api/cancelOrder?userKey=${userName || ''}&orderId=${values.orderId}&symbol=${values.symbol}`)
}