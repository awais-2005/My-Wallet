import { API_KEY, SERVER_URL } from "../config/constants";

export default async function register(name, email, password) {
    return await fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({
            name,
            email,
            password,
        })
    });
}