import { double } from './example';

test('첫 테스트', () => {
  expect(123).toBe(123);
});
// tip. 일부러 틀린 데이터를 먼저 입력
test('인수가 숫자 데이터 입니다', () => {
  expect(double(3)).toBe(6);
  expect(double(10)).toBe(20);
});

test('인수가 없습니다.', () => {
  expect(double()).toBe(0);
  expect(double()).toBe(123);
});
