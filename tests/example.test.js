// ! 01. test 연습

import { double, asyncFn } from './example';

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
//     expect(double(10)).toBe(21);
//   });

//   test('인수가 없습니다.', () => {
//     console.log('Third Test!');
//     expect(double()).toBe(0);
//     // expect(double()).toBe(123);
//   });
// });

// // ! 02. matcher 연습
// const userA = {
//   name: 'uhjee',
//   age: 85,
// };
// const userB = {
//   // name: 'uhjee',
//   // age: 85,
//   name: 'bii',
//   age: 24,
// };

// // toBe
// test('데이터가 일치해야 합니다.', () => {
//   expect(userA.age).toBe(85);
// });

// test('객체가 일치해야 합니다.', () => {
//   // expect(userA).toBe(userB);
//   expect(userA).not.toEqual(userB);
// });

// ! 03. 비동기 함수 테스트
describe('비동기 테스트', () => {
  // ! 03-1. 방법 :: test() 콜백함수의 매개변수 done
  test('done', done => {
    // 매개변수 - done :: 비동기 실행 완료까지 기다리게 해주는 함수
    asyncFn().then(res => {
      expect(res).toBe('done'); // 모두 정상이라고 출력됨(비동기를 기다리지 않고 결과 출력하기 때문에) -> 문제 있음
      done(); // 이때까지 기다린다
    });
  });

  // ! 03-2. 방법 :: 비동기 객체(Promise) 반환하기
  test('then', () => {
    // return 값으로 Promise 객체 (return 키워드 사용)
    return asyncFn().then(res => {
      expect(res).toBe('done!');
    });
  });

  // ! 03-3. 방법 :: 브릿지 resolves 사용
  test('resolves', () => expect(asyncFn()).resolves.toBe('done?'));
  
  // ! 03-4. 방법 :: async/await 사용
  test('async/await', async () => {
    const res = await asyncFn();
    expect(res).toBe('done');
  });
});
