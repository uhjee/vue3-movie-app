// ! 01. test 연습

// import { double } from './example';

// // describe :: 일종의 테스트 들의 그룹
// describe('그룹 1', () => {
//   beforeAll(() => {
//     console.log('before All');
//   });
//   afterAll(() => {
//     console.log('after All');
//   });
//   beforeEach(() => {
//     console.log('before each');
//   });
//   afterEach(() => {
//     console.log('after each');
//   });

//   test('첫 테스트', () => {
//     console.log('First Test!');
//     expect(123).toBe(123);
//   });
//   // tip. 일부러 틀린 데이터를 먼저 입력
//   test('인수가 숫자 데이터 입니다', () => {
//     console.log('Second Test!');
//     expect(double(3)).toBe(6);
//     expect(double(10)).toBe(20);
//   });

//   test('인수가 없습니다.', () => {
//     console.log('Third Test!');
//     expect(double()).toBe(0);
//     // expect(double()).toBe(123);
//   });
// });

// ! 02. matcher 연습
const userA = {
  name: 'uhjee',
  age: 85,
};
const userB = {
  // name: 'uhjee',
  // age: 85,
  name: 'bii',
  age: 24,
};

// toBe
test('데이터가 일치해야 합니다.', () => {
  expect(userA.age).toBe(85);
});

test('객체가 일치해야 합니다.', () => {
  // expect(userA).toBe(userB);
  expect(userA).not.toEqual(userB);
});
