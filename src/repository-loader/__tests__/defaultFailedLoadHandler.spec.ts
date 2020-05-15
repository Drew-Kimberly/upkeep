import {defaultFailedLoadHandler} from '../defaultFailedLoadHandler';
import {createMemorySource} from '../memory-source';

describe('Test suite for defaultFailedLoadHandler', () => {
  test('The handler can be invoked without error', () => {
    const source = createMemorySource([]);
    const error = new Error('test');

    expect(defaultFailedLoadHandler(source, error)).toBeUndefined();
  });
});
