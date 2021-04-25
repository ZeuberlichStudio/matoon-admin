const {API_URL} = process.env;

export default {
    login: ({username, password}) => {
        return fetch(`${API_URL}/users/verify`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response);
                }
                
                return response.json();
            })
            .then(token => localStorage.setItem('token', token));
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
}