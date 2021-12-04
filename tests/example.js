import axios from 'axios';

export function double(num) {
  if (!num) return 0;
  return num * 2;
}

// test용 비동기 함수
export const asyncFn = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, 7000);
  });

export const fetchMovieTitle = async () => {
  const res = await axios.get(
    'https://omdbapi.com?apikey=7035c60c&i=tt4520988',
  );
  if (res === null || res === undefined) {
    return null; // Frozen II  => Frozen ii (첫 글자만 대문자로)
  }
  const title = res.data.Title;
  const titleCharArr = [...title.toLowerCase()];
  titleCharArr[0] = titleCharArr[0].toUpperCase();
  return titleCharArr.join('');
};
