const URL = 'http://localhost:8000';

export const getFormLink = (formId, token) => {
    return fetch(`${URL}/api/form/${formId}/link`, {
        method: 'GET',
        headers: {
        "Content-Type" : "application/json",
            'Authorization': token
        }
    })
}