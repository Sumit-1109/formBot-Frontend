const URL = 'https://formbot-backend-nbib.onrender.com';

export const emailLink = (dashBoardId, token, email, role) => {
  return fetch(`${URL}/api/share/dashboard/email`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
    body: JSON.stringify({ dashBoardId, email, role }),
  });
};

export const sharingLink = (dashBoardId, token, role) => {
  return fetch(`${URL}/api/share/dashboard/link`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    },
    body: JSON.stringify({ dashBoardId, role }),
  });
};

export const sharedLinkAccess = (token) => {
  return fetch(`${URL}/api/share/dashboard/link/${token}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  });
};
