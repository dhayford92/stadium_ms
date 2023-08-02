import { revalidatePath } from "next/cache"


export const GetAllEvents = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/events/', {
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


export const GetEvent = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/event/'+id+'/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}


// --- Add to Cart ---
export const AddtoCart = async (token, id, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/cart/'+id+'/',{
        method: 'Post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    }
}


// --- Get Cart ---
export const GetCart = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/cart/'+id+'/',{
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }else{
        return data
    }
}


// --- Delete Cart ---