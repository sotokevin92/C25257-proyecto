export class AuthError extends Error {
    constructor(message) {
        super(message);
        this.code = 'AUTH_ERROR';
    }
}