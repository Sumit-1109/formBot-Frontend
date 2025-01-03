const URL = 'https://formbot-backend-nbib.onrender.com';

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

export const modify = (data, token) => {
    return fetch (`${URL}/api/user/modify`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data),
    })
};

export const getTheme = (token) => {
    return fetch(`${URL}/api/user/theme`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
};

export const updateTheme = (token, theme) => {
    return fetch(`${URL}/api/user/theme`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify({theme}),
    })
};

export const logOut = (token) => {
    return fetch (`${URL}/api/user/logout`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}