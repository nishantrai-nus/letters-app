import { ConflictError, UnauthorisedError } from "../errors/http_errors";
import { Letter } from "../models/letter";
import { User } from "../models/user"

const API_URL="https://penpals-backend.onrender.com";
// const API_URL="http://localhost:5000";


async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorisedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        }
        throw Error("Request failed with status:" + response.status + ", and message: " + errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(API_URL + "/api/users", { method: "GET", credentials: "include" });
    return response.json();
}

export async function getUsers(): Promise<User[]> {
    const response = await fetchData(API_URL + "/api/users/getUsers", {method: "GET", credentials: "include" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials) {
    const response = await fetchData(API_URL + "/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials) {
    const response = await fetchData(API_URL + "/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include" 
        });
    return response.json();
}

export async function logout() {
    await fetchData(API_URL + "/api/users/logout", { method: "POST", credentials: "include"  });
}

export async function fetchLetters(): Promise<Letter[]> {
    const response = await fetchData(API_URL + "/api/letters/sentLetters", { method: "GET", credentials: "include"  });
    return response.json();
}

export async function fetchReceivedLetters(): Promise<Letter[]> {
    const response = await fetchData(API_URL + "/api/letters", { method: "GET", credentials: "include"  });
    return response.json();
}

export interface LetterInput {
    title: string,
    text?: string,
    recipientUsername: string,
}

export async function createLetter(letter: LetterInput): Promise<Letter> {
    const response = await fetchData(API_URL + "/api/letters/sentLetters",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(letter),
            credentials: "include" 
        });
    return response.json();
}

export async function updateLetter(letterId: string, letter: LetterInput): Promise<Letter> {
    const response = await fetchData(API_URL + "/api/letters/" + letterId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(letter),
        credentials: "include" 
    })
    return response.json();
}

export async function deleteLetter(letterId: string) {
    await fetchData(API_URL + "/api/letters/" + letterId, { method: "DELETE", credentials: "include"  });
}