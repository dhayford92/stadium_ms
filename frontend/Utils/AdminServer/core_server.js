// --- dashboard ---
export const GetDashboard = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/', {
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