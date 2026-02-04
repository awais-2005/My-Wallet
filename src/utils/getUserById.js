import { API_KEY, SERVER_URL } from "../config/constants";

export default async function getUserById(id) {
    return await fetch(`${SERVER_URL}/user/${id}`, {
        headers: {
            "x-api-key": API_KEY
        }
    });
}