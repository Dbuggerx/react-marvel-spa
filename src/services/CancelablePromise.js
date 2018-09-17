// @flow

/**
 * A promise wrapper to handle cancelation
 * @see https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 */
export default class CancelablePromise<T> {
    constructor(promise: Promise<T>) {
        this.promise = new Promise((resolve, reject) => {
            promise.then(
                (val: T) => (this.canceled ? reject(new Error(this.constructor.errorMessage)) : resolve(val)),
                (error: Error) => (this.canceled ? reject(new Error(this.constructor.errorMessage)) : reject(error)),
            );
        });
    }
    promise: Promise<T>;
    canceled = false;

    cancel() {
        this.canceled = true;
    }

    static errorMessage = 'canceled';
}
