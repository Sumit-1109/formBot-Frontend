const URL = 'https://formbot-backend-nbib.onrender.com';

export const getFolderDashBoard = (token, dashBoardId, folderId) => {
    return fetch(`${URL}/api/folder/${dashBoardId}/folder/${folderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    })
};

export const createFolder = (token, dashBoardId, folderName) => {
    return fetch(`${URL}/api/folder/${dashBoardId}/createfolder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({folderName: folderName})
    });
};

export const deleteFolder = (token, dashBoardId, folderId) => {
    return fetch (`${URL}/api/folder/${dashBoardId}/folder/${folderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
};