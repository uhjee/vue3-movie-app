import { double } from './example';

// describe :: 일종의 테스트 들의 그룹
describe('그룹 1', () => {
  beforeAll(() => {
    console.log('before All');
  });
  afterAll(() => {
    console.log('after All');
  });
  beforeEach(() => {
    console.log('before each');
  });
  afterEach(() => {
    console.log('after each');
  });

  test('첫 테스트', () => {
    console.log('First Test!');
    expect(123).toBe(123);
  });
  // tip. 일부러 틀린 데이터를 먼저 입력
  test('인수가 숫자 데이터 입니다', () => {
    console.log('Second Test!');
    expect(double(3)).toBe(6);
    expect(double(10)).toBe(20);
  });

  test('인수가 없습니다.', () => {
    console.log('Third Test!');
    expect(double()).toBe(0);
    // expect(double()).toBe(123);
  });
});
