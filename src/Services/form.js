const URL = 'http://localhost:8000';

export const saveForm = async (fileId, formData, token, formName) => {
    return fetch(`${URL}/api/form/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({fileId, ...formData, formName}),
    })
};

export const getForm = async (formId, token) => {
    return fetch(`${URL}/api/form/${formId}`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': token,
        }
    })
}