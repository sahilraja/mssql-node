import { APIError } from "./custom_error";

export function processMongooseErrors(error: any) {
    if (!error.errors) {
        return error
    }
    return Object.keys(error.errors).map(key => {
        if (error.errors[key].kind == 'enum') {
            error.errors[key].message = `Please enter valid data for ${key}`
        }
        var keys = key.split(".").pop()
        if (!error.errors[key].errors) {
            return new APIError(keys, error.errors[key].message || "Enter valid data")
        }
        // checking for innerSchema errors
        if (error.errors[key].errors) {
            return Object.keys(error.errors[key].errors).map(innerKey => {
                if (error.errors[key].errors[innerKey].kind == 'enum') {
                    error.errors[key].errors[innerKey].message = `Please enter valid data for ${innerKey}`
                }
                return new APIError(innerKey, error.errors[key].errors[innerKey].message)
            })
        }
        return new APIError(key, error.errors[key].message)
    });
}

export function processErrors(errors: any) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return errors.reduce((prev: any, current: Error) => {
        if (current instanceof APIError) {
            prev[current.key] = current.message;
            if (current.code) {
                prev['code'] = current.code
            }
            return prev;
        }
        else {
            prev['__globals'] = (prev['__globals'] || []).concat(current.message);
            return prev
        }
    }, {})
}