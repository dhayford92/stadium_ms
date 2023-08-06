// --- get all events ---
export const GetAdminTicket = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/ticket/', {
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



// --- get detail ticket ---
export const GetDetailTicket = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/ticket/'+id+'/', {
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


// --- delete event ---
export const DeleteTicket = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/ticket/'+id+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    if (response.status === 204) {
        return {'message': 'Ticket successfully deleted'}
    }
}


/// --- refund calls ---

export const RefundDashCall = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/refund/', {
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

export const UpdateRefund = async (id, status) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/refund/'+id+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'status': status
        })
    })
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    else{
        return data
    } 
}

export const PayRefund = async (id) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/refund/'+id+'/pay/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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