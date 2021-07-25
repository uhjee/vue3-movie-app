<template>
  <div class="container">
    <input
      class="form-control"
      v-model="title"
      placeholder="Search for movies, Series & more"
      type="text"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apple
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '', // default: option 태그의 value가 '' 인 경우 - All Years
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode'],
        },
        {
          name: 'number',
          items: [10, 20, 30],
        },
        {
          name: 'year',
          items: (() => {
            const years = [];
            for (let i = new Date().getFullYear(); i >= 1985; i -= 1) {
              years.push(i);
            }
            return years;
          })(),
        },
      ],
    };
  },
  methods: {
    /**
     * OMDB 영화 목록 조회 API를 요청한다.
     * @author  uhjee
     * @return  {[type]}  [return description]
     */
    async apply() {
      const params = {
        s: this.title,
        type: this.type,
        y: this.year,
        number: this.number,
        page: 1,
      };

      this.$store.dispatch('movie/searchMovies', params); // 'store모듈이름 / action 이름'
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  > * {
    margin-right: 10px;

    font-size: 0.9rem;

    &:last-child {
      margin-right: 0;
    }
  }

  .selects {
    display: flex;

    select {
      width: 120px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>
