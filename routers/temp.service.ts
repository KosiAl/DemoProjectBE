interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

var user: User;

export function saveUser(pUser: User) {
    pUser.id = Math.floor(Math.random() * 100);
    user = pUser;
}

export function getUser() {
    return user;
}
