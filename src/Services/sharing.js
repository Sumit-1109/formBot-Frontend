const URL = 'http://localhost:8000';



export const sharingLink = (dashBoardId, token, role) => {
    return fetch(`${URL}/api/${dashBoardId}/shareLink`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            'Authorization' : token,
        },
        body: JSON.stringify({role}),
    });
};

export const emailLink = (dashBoardId, token, email, role) => {
    return fetch(`${URL}/api/${dashBoardId}/shareEmail`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            'Authorization' : token,
        },
        body: JSON.stringify({email, role}),
    });
};