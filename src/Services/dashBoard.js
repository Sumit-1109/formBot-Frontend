const URL = 'http://localhost:8000';

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