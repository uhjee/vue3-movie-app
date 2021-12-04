export function double(num) {
  if (!num) return 0;
  return num * 2;
}

// test용 비동기 함수
export const asyncFn = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, 2000);
  });
