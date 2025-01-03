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

export const startResponse = async (formId) => {
    const response = await fetch(`/api/form/${formId}/start`, { method: 'POST' });
    return response.json();
  };
  
  export const saveResponse = async (formId, responseId, responses) => {
    await fetch(`/api/form/${formId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseId, responses }),
    });
  };
  
  export const submitResponse = async (formId, responseId) => {
    await fetch(`/api/form/${formId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseId }),
    });
  };
  