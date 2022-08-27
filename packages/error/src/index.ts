import ExtendableError from "extendable-error";

class SignacError extends ExtendableError {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export default SignacError;
