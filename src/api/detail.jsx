import axios from '.';
export function getSymbols() {
    return axios.get('/api/getSymbols');
}