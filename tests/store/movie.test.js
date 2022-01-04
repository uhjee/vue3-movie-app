import axios from 'axios';
import movieStore from '@/store/movie'; // import store module
import _cloneDeep from 'lodash/cloneDeep';

/**
 *  store test
 */

describe('store/movie.js', () => {
  let store;

  beforeEach(() => {
    store = _cloneDeep(movieStore);
    store.state = store.state(); // store의 state는 불변성을 위해 함수로 작성되어 있음. component의 data 도 마찬가지

    // test용 commit 함수 정의
    store.commit = (name, payload) => {
      store.mutations[name](store.state, payload);
    };

    // test용 dispatch 함수 정의
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch,
      };

      return store.actions[name](context, payload); // actions는 비동기 함수(promise 객체 반환)
    };
  });

  test('영화 데이터를 초기화합니다.', () => {
    store.commit('updateState', {
      movies: [{ idmdb: '1' }],
      message: 'Testing ...',
      loading: true,
    });

    store.commit('resetMovies');

    expect(store.state.movies).toEqual([]); // 빈 배열 기대 , reference data -> toEqual
    expect(store.state.message).toBe('Search for the movie title!');
    expect(store.state.loading).toBe(false); // primitive data -> toBe
  });

  test('영화 목록을 잘 가져온 경우 데이터를 확인합니다.', async () => {
    const res = {
      data: {
        Response: true,
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021',
          },
        ],
      },
    };

    // axios.post에 test용 모의 함수 세팅 (실제 network 요청응답 없이 test하기 위해)
    // axios.post = jest.fn(() => {
    //   return new Promise(resolve => {
    //     resolve(res);
    //   });
    // });

    axios.post = jest.fn().mockResolvedValue(res); // 모의 함수

    // action 호출
    await store.dispatch('searchMovies'); // action 은 비동기

    expect(store.state.movies).toEqual(res.data.Search);
  });

  test('영화 목록을 가져오지 못한 경우, 에러 메세지를 확인합니다.', async () => {
    const errorMessage = 'Network Error';

    // 요청에 에러가 발생하도록 설정
    axios.post = jest.fn().mockRejectedValue(new Error(errorMessage));
    await store.dispatch('searchMovies');
    expect(store.state.message).toBe(errorMessage);
  });

  test('영화 이름을 중복되지 않도록 고유하게 처리합니다.', async () => {
    const res = {
      data: {
        Response: true,
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021',
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021',
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021',
          },
        ],
      },
    };

    axios.post = jest.fn().mockResolvedValue(res);

    await store.dispatch('searchMovies');

    expect(store.state.movies.length).toBe(1);
  });

  test('단일 영화의 상세 정보를 잘 가져오는 경우 데이터를 확인합니다.', async () => {
    const res = {
      data: {
        imdbID: '1',
        Title: 'Frozen',
        Poster: 'frozen.jpg',
        Year: '2021',
      },
    };

    axios.post = jest.fn().mockResolvedValue(res);
    await store.dispatch('searchMovieWithId');
    expect(store.state.theMovie).toEqual(res.data);
    // expect(store.state.theMovie).toEqual({});
  });
});
