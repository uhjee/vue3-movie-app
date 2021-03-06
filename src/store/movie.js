import axios from 'axios';
// import Keys from '@/../keys.json';
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage = 'Search for the movie title!';

export default {
  namespaced: true, // store/index.js 에 명시해 module로써 활용 가능

  // 불변성을 위해 함수의 return 값으로 객체 보관 후 리턴
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }), // 취급해야하는 데이터
  getters: {
    movieIds(state) {
      // state를 매개변수로 가져온다
      return state.movies.map(m => m.imdbId);
    },
  }, // computed 개념
  // state를 조작
  mutations: {
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
    /**
     * 모든 state를 변이할 수 있는 공통 메소드
     *
     * @param   {[type]}  state    vuex에서 넣어주는 객체
     * @param   {[type]}  payload  state 이름의 프로퍼티를 가진 객체
     * @return  {[type]}           [return description]
     */
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
  },
  // mutations를 호출 (비동기로 동작!!)
  actions: {
    // searchMovies(context) { // context - { state, getters, commit}
    async searchMovies({ commit, state }, payload) {
      //  중복 호출 방지
      if (state.loading) return;

      //message 초기화
      commit('updateState', {
        message: '',
        loading: 'true',
      });

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });

        if (res.data.Response) {
          const { Search, totalResults } = res.data;
          commit('updateState', {
            movies: _uniqBy(Search, 'imdbID'),
          });
          const total = parseInt(totalResults, 10); // api 응답이 String으로 오기 때문에 형변환
          const pageLength = Math.ceil(total / 10);

          // 추가 요청
          if (pageLength > 1) {
            for (let page = 2; page <= pageLength; page += 1) {
              // number 보다 큰 페이지수는 요청을 보내지 않도록
              if (page > payload.number / 10) break;

              const res = await _fetchMovie({
                ...payload,
                page, // for 문의 page로 요청
              });
              const { Search } = res.data;
              commit('updateState', {
                movies: [...state.movies, ..._uniqBy(Search, 'imdbID')],
              });
            }
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          movies: [],
          message,
        });
      } finally {
        commit('updateState', {
          loading: false,
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;

      commit('updateState', {
        theMovie: {}, // 기존 데이터 초기화
        loading: true,
      });

      try {
        const res = await _fetchMovie(payload);
        commit('updateState', {
          theMovie: res.data,
        });
      } catch (error) {
        commit('updateState', {
          theMovie: {},
        });
      } finally {
        commit('updateState', {
          loading: false,
        });
      }
    },
  },
};

/**
 * 실제 api를 호출하는 메소드
 *
 * @var {[type]}
 */
const _fetchMovie = async payload => {
  // // API 권한 관련 parameters
  // if (payload !== undefined && payload !== null) {
  //   // ! payload.apikey = Keys.OMDB_API_KEY;
  //   payload.apikey = '21b591';
  //   // id 여부로 개별 검색 or 다수 검색 분기 처리
  //   // if (payload.id) {
  //   //   payload.i = Keys.OMDB_ID;
  //   // }
  // }

  // const url = 'https://www.omdbapi.com/';

  // return new Promise((resolve, reject) => {
  //   axios
  //     .get(url, { params: payload })
  //     .then(res => {
  //       if (res.data.Error) {
  //         reject(res.data.Error);
  //         return;
  //       }
  //       resolve(res);
  //     })
  //     .catch(err => {
  //       reject(err.message);
  //     });
  // });

  // ! netlify serverless function 호출
  return await axios.post(`/.netlify/functions/movie`, payload);
};
