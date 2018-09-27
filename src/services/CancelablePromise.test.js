import CancelablePromise from './CancelablePromise';

describe('CancelablePromise', () => {
    test('resolves the wrapped promise value', async () => {
        const promise = Promise.resolve('test');
        const cancelable = new CancelablePromise(promise);
        expect(await cancelable.promise).toBe('test');
    });

    test('rejects the wrapped promise error', async () => {
        const promise = Promise.reject(new Error('expected error'));
        const cancelable = new CancelablePromise(promise);

        try {
            await cancelable.promise;
            throw new Error('Not expected!');
        } catch (err) {
            expect(err.message).toBe('expected error');
        }
    });

    describe('cancel', () => {
        test('rejects with the "canceled" error on success', async () => {
            const promise = Promise.resolve('test');
            const cancelable = new CancelablePromise(promise);
            cancelable.cancel();

            try {
                await cancelable.promise;
                throw new Error('Not expected!');
            } catch (err) {
                expect(err.message).toBe('canceled');
            }
        });

        test('rejects with the "canceled" error on error', async () => {
            const promise = Promise.reject(new Error('expected error'));
            const cancelable = new CancelablePromise(promise);
            cancelable.cancel();

            try {
                await cancelable.promise;
                throw new Error('Not expected!');
            } catch (err) {
                expect(err.message).toBe('canceled');
            }
        });
    });
});
