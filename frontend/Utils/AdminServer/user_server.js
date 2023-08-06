import React from "react"

export const GetAllUsers = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}


export const CreateUser = async (token, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}


export const GetUser = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/users/'+id+'/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}


export const UpdateUser = async (token, id, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/users/'+id+'/', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}

export const DeleteUser = async (token, id) => { 
    const response = await fetch('http://127.0.0.1:8000/api/admin/users/'+id+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    if (response.status === 204) {
        return {'message': 'User deleted successfully'}
    }
}