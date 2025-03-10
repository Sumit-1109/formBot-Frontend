const URL = 'https://formbot-backend-nbib.onrender.com';

export const createFile = (token, dashBoardId, fileName) => {
    return fetch(`${URL}/api/file/${dashBoardId}/createfile`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({fileName: fileName})
    } )
};

export const createFileInFolder = (token, dashBoardId, folderId, fileName) => {
    return fetch(`${URL}/api/file/${dashBoardId}/folder/${folderId}/createfile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({fileName})
    })
};

export const deleteFile = (token, dashBoardId, formId) => {
    return fetch(`${URL}/api/file/${dashBoardId}/file/${formId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
};

export const deleteFolderFile = (token, dashBoardId, folderId, fileId) => {
    return fetch(`${URL}/api/file/${dashBoardId}/folder/${folderId}/${fileId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
}

export const getFile = async (fileId, token) =>{
    return fetch(`${URL}/api/workspace/${fileId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
}
