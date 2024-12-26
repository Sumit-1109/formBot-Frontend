const URL = 'http://localhost:8000';

export const getWorkspace = (token) => {

    return fetch(`${URL}/api/workspace/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    });
};

export const getFolderWorkspace = (token, workSpaceId, folderId) => {
    return fetch(`${URL}/api/workspace/${workSpaceId}/folder/${folderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
    })
}

export const createFolder = (token, workspaceId, folderName) => {
    return fetch(`${URL}/api/workspace/${workspaceId}/createFolder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({folderName: folderName})
    });
};

export const createForm = (token, workspaceId, formName) => {
    return fetch(`${URL}/api/workspace/${workspaceId}/createForm`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({formName: formName})
    } )
};

export const createFormInFolder = (token, workspaceId, folderId, formName) => {
    return fetch(`${URL}/api/workspace/${workspaceId}/folder/${folderId}/createForm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({formName: formName})
    })
};

export const deleteFolder = (token, workspaceId, folderId) => {
    return fetch (`${URL}/api/workspace/${workspaceId}/folder/${folderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
};

export const deleteForm = (token, workspaceId, formId) => {
    return fetch(`${URL}/api/workspace/${workspaceId}/form/${formId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
};