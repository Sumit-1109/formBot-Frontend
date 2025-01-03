const URL = 'https://formbot-backend-nbib.onrender.com';

export const getDashBoard = (token) => {

    return fetch(`${URL}/api/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    });
};

export const getSharedDashBoard = (token) => {
    return fetch(`${URL}/api/dashboard/shared`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    });
};