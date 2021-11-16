<template>
  <div class="container">
    <template v-if="loading">
      <!-- SKELETON UI: loading 시 잠시 틀만 보여주는 -->
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="4"
        :z-index="9"
        fixed />
    </template>
    <!-- Movie Detail  -->
    <div
      v-else
      class="movie-details">
      <div
        :style="{
          backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`,
        }"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="getImageUrl(name)"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      imageLoading: true,
    };
  },
  computed: {
    loading() {
      return this.$store.state.movie.loading;
    },
    theMovie() {
      return this.$store.state.movie.theMovie;
    },
  },
  created() {
    this.$store.dispatch('movie/searchMovieWithId', {
      // e.g. movie/tt123762
      i: this.$route.params.id,
    });
  },
  methods: {
    /**
     * 평점 기관에 따른 이미지 url을 반환한다.
     *
     * @param   {string}  ratingCompanyName  [ratingCompanyName description]
     * @return  {string}                     [return description]
     */
    getImageUrl(ratingCompanyName) {
      const nonBlankName = this.removeBlank(ratingCompanyName);
      if (nonBlankName === null)
        return 'https://via.placeholder.com/150x225?text=uhjee';
      return `https://raw.githubusercontent.com/uhjee/vue3-movie-app/master/src/assets/${nonBlankName}.png`;
    },
    /**
     * string 파라미터의 공백문자를 제거한다.
     *
     * @param   {string}  value  [value description]
     * @return  {string}         [return description]
     */
    removeBlank(value) {
      if (value === null || value === undefined || typeof value !== 'string')
        return null;
      return value.replaceAll(' ', '');
    },
    /**
     * url의 이미지 담당 string을 대체해 반환한다.
     */
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === 'N/A') {
        this.imageLoading = false;
        return '';
      }
      const src = url.replace('SX300', `SX${size}`);
      this.$loadImage(src).then(() => {
        this.imageLoading = false;
      });
      return src;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '@/scss/main';

.container {
  padding-top: 40px;
}

.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0; // 감소 너비 사용 X (화면 줄어들더라도 너비 유지)
    width: 500px;
    height: 500px * 3 /2;
    margin-right: 70px;
    position: relative;
  }
  .specs {
    flex-grow: 1; // 증가 너비 사용 O (너비를 최대한 많이 사용)
  }

  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;

    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}

.movie-details {
  display: flex;
  color: $gray-600;

  .poster {
    // 화면 크기에 따라 줄어들지 않도록 감소 비율
    flex-shrink: 0;

    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    // ! background-image (width | height) 큰 값에 맞춰 채우기
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs {
    // 화면 크기에 따라 늘어나도록 증가 비율
    flex-grow: 1;
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          // ! span 들 사이에 특수문자
          // ! CSS-content:: numeric order로 문자 삽입
          content: '\00b7';
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 /2;
      margin-right: 40px;
    }
  }

  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
