export class APIError extends Error {
    public key: String;
    public code: Number;
    constructor(key: any, message: any, code = 400) {
        super(message);
        this.key = key;
        this.code = code
    }
}