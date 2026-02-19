import { API_KEY, SERVER_URL } from "../config/constants";

const parseResponse = async (res) => {
    let data = {};
    try {
        data = await res.json();
    } catch (err) {
        data = {};
    }

    if (!res.ok) {
        throw new Error((data?.error || data?.message || "Request failed") + " This Err");
    }

    return data;
}

const toBackendTransaction = (tx) => ({
    amount: tx.amount,
    type: tx.type,
    description: tx.description,
    created_at: tx.created_at,
});

const normalizeBackendId = (id) => encodeURIComponent(String(id));

export async function createNewTransaction(tx, token) {
    
    const res = await fetch(`${SERVER_URL}/transaction/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(toBackendTransaction(tx)),
    });

    return parseResponse(res);
}

export async function updateTransactionById(id, tx, token) {
    const res = await fetch(`${SERVER_URL}/transaction/update/${normalizeBackendId(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(toBackendTransaction(tx)),
    });

    return parseResponse(res);
}

export async function deleteTransactionById(id, token) {
    const res = await fetch(`${SERVER_URL}/transaction/delete/${normalizeBackendId(id)}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
    });

    return parseResponse(res);
}

export async function savePendingTransactions(list, token) {
    const sanitizedList = Array.isArray(list) ? list.map(toBackendTransaction) : [];
    const res = await fetch(`${SERVER_URL}/transaction/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ list: sanitizedList }),
    });

    return parseResponse(res);
}

export const extractBackendIds = (response) => {
    if (Array.isArray(response?.ids)) return response.ids;
    if (Array.isArray(response?.data?.ids)) return response.data.ids;
    if (Array.isArray(response?.insertedIds)) return response.insertedIds;
    return [];
}
