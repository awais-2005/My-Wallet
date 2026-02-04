import { API_KEY, SERVER_URL } from "../config/constants";

export default async function saveNewInfo(newName, newEmail, token) {
    return await fetch(`${SERVER_URL}/user/update`, {
        method: 'PUT',
        headers: {
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName, email: newEmail, password: '000000' })
    });
}