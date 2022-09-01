import ExtendableError from "extendable-error";
declare class SignacError extends ExtendableError {
    code: number;
    constructor(message: string, code: number);
}
export default SignacError;
