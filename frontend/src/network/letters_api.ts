import { Letter } from "../models/letter";
import { User } from "../models/user"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", {method: "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials) {
    const response = await fetchData("/api/users/signup", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials) {
    const response = await fetchData("/api/users/login", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchLetters(): Promise<Letter[]> {
    const response = await fetchData("/api/letters", { method: "GET" });
    return response.json();
}

export interface LetterInput {
    title: string,
    text?: string,
}

export async function createLetter(letter: LetterInput): Promise<Letter> {
    const response = await fetchData("/api/letters",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(letter),
        });
    return response.json();
}

export async function updateLetter(letterId: string, letter: LetterInput): Promise<Letter> {
    const response = await fetchData("/api/letters/" + letterId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(letter)
    })
    return response.json();
}

export async function deleteLetter(letterId: string) {
    await fetchData("/api/letters/" + letterId, { method: "DELETE" });
}