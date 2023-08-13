const park_server = 'http://127.0.0.1:8000/api/admin/';


// Path: frontend\Utils\AdminServer\park_server.js

// Create park
export const create_park = (data) => {
    const response = fetch(park_server + 'parking-lot/', {
        method: 'POST',
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
};


// Get all park
export const get_park = (event) => {
    const response = fetch(park_server + 'parking-lot/?event__id='+event, {
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


// Get park by id
export const get_park_by_id = (id) => {
    const response = fetch(park_server + 'parking-lot/' + id, {
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
}


// Delete park by id
export const delete_park_by_id = (id) => {
    const response = fetch(park_server + 'park/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
    });
}


// Update park by id
export const update_park_by_id = (id, data) => {
    const response = fetch(park_server + 'park/' + id, {
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
}


