import { API_KEY, SERVER_URL } from "../config/constants";

export default async function login(email, password) {
    return await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
}
