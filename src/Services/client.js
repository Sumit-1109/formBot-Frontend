const URL = 'http://localhost:8000';

export const signUp = (data) => {
    return fetch(`${URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const signIn = (data) => {
    return fetch(`${URL}/api/user/signin`, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
};

export const getTheme = (userId) => {
    return fetch(`${URL}/api/user/${userId}/theme`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
};

export const updateTheme = (userId, theme) => {
    return fetch(`${URL}/api/user/${userId}/theme`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({theme}),
    })
};