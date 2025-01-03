const URL = 'https://formbot-backend-nbib.onrender.com';

export const getFormLink = async (formId, token) => {
    const response = await fetch(`${URL}/api/forms/${formId}/link`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  };
  