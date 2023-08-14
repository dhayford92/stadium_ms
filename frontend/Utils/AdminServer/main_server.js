const baseUrl = 'http://127.0.0.1:8000/api/admin/';


// Get All Assets
export const get_assets = () => {
    const response = fetch(baseUrl + 'asset/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
    });
    return response;
};



// Get All maintenance
export const get_maintenance = () => {
    const response = fetch(baseUrl + 'maintenance/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
    });
    return response;
}

// get maintenance counts 
export const get_maintenance_counts = () => {
    const response = fetch(baseUrl + 'maintenance-count', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
    });
    return response;
}


// update maintenance
export const update_maintenance = (id, data) => {
    const response = fetch(baseUrl + 'maintenance/' + id + '/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
    });
    return response;
}