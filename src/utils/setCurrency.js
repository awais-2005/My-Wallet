import { API_KEY, SERVER_URL } from "../config/constants";

export async function setCurrency(userId, currency) {
    return await fetch(`${SERVER_URL}/user/setcurrency/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify({ currency }),
    });
}