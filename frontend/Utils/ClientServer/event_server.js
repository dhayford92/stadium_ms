// -- get user detail --
export const GetUserDetail = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/user/client/detail/', {
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

// --- Update User Detail ---
export const UpdateUserDetail = async (token, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/user/client/detail/', {
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




export const GetAllEvents = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/core/events/', {
        method: 'GET',
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


export const GetEvent = async (id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/event/'+id+'/',{
        method: 'GET',
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

// --- Make transaction ---
export const Checkout = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/checkout/'+id+'/',{
        method: 'Post',
        // body: JSON.stringify(body),
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


// --- Get Home Transaction ---
export const GetHomeTransaction = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/profile/home/', {
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



// --- Get Parking Lot ---
export const GetParkingLot = async (token, id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/parklot/'+id, {
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

// -- update parking lot --
export const UpdateParkingLot = async (token, id, body) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/parklot/'+id, {
        method: 'PATCH',
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


// --- Detail Ticket --- \
export const TicketDetail = async (id) => {
    const response = await fetch('http://127.0.0.1:8000/api/core/ticket/'+id+'/detail', {
        method: 'GET',
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