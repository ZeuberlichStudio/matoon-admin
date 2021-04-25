import { fetchUtils } from 'react-admin';

const {API_URL} = process.env;
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

export default {
    getList(resource, params) {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = `limit=${perPage}&skip=${(page - 1) * perPage}&sort=${field},${order === 'DESC' ? '-1' : '1'}`;
        const url = `${API_URL}/${resource}?${query}`;


        return httpClient(url)
        .then(res => ({
           data: res.json.map(resource => ({...resource, id: resource._id})),
           total: parseInt(res.headers.get('X-Total-Count'))
        }));
    },

    getMany(resource, params) {
        const query = ``;
        const url = `${API_URL}/${resource}?${query}`;

        return httpClient(url).then(({header, json}) => ({
           data: json.map(resource => ({...resource, id: resource._id}))
        }));
    },

    getOne(resource, params) {
        const url = `${API_URL}/${resource}/${params.id}`;

        return httpClient(url).then(({json}) => ({
            data: Object.assign(json, { id: json._id })
        }));
    },

    update(resource, params) {
        return httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(({json}) => ({
            data: Object.assign(json, { id: json._id })
        }));
    },

    create(resource, params) {
        return httpClient(`${API_URL}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data)
        }).then(({json}) => ({
            data: Object.assign(json, { id: json._id })
        }));
    },

    delete(resource, params) {
        return httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE'
        }).then(({json}) => ({data: json}))
    },

    deleteMany(resource, params) {
        return httpClient(`${API_URL}/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify(params.ids)
        }).then(({json}) => ({data: json}))
    }
}