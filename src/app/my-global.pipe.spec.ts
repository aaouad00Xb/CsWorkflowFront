import { MyGlobalPipe } from './my-global.pipe';

describe('MyGlobalPipe', () => {
  it('create an instance', () => {
    const pipe = new MyGlobalPipe();
    expect(pipe).toBeTruthy();
  });
});
