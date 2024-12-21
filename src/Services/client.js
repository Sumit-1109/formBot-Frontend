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
}