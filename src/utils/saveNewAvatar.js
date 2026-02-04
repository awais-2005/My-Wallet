import { API_KEY, SERVER_URL } from "../config/constants";

export default async function saveAvatarUri(uri, token) {
    console.log({uri, token});
    return await fetch(`${SERVER_URL}/user/avatar`, {
        method: 'PUT',
        headers: {
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: uri })
    });
}