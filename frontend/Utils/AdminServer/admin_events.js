// --- get all events ---
export const GetALLAdminEvents = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/events/', {
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


// --- create event ---
export const CreateEvent = async (token, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/events/', {
        method: 'POST',
        body: body,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 201) {
        return data
    }
    else{
        return data
    }
}


// --- get detail event ---
export const GetDetailEvent = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/event/'+id+'/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 201) {
        return data
    }
    else{
        return data
    }
}



// --- update event ---
export const UpdateEvent = async (token, body, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/event/'+id+'/update/', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 201) {
        return data
    }
    else{
        return data
    }
}



// --- update event image ---
export const UpdateEventImage = async (token, body, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/event/'+id+'/image/', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await response.json()
    if (response.status === 201) {
        return data
    }
    else{
        return data
    }
}


// --- delete event ---
export const DeleteEvent = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/event/'+id+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    if (response.status === 204) {
        return {'message': 'Event successfully deleted'}
    }
}



