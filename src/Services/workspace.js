const URL = 'http://localhost:8000';

export const getWorkspace = (userId) => {
    const token = localStorage.getItem("token");

    return fetch(`${URL}/api/workspace/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    });
};