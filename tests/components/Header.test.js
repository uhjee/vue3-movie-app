import { shallowMount } from '@vue/test-utils';
import router from '@/routes';
import store from '@/store';
import Header from '@/components/Header';

describe('components/Header.vue', () => {
  let wrapper;
  beforeEach(async () => {
    // mockup function
    window.scrollTo = jest.fn();

    // 라우팅 테스트(아래 경로로 이동한 후에 컴포넌트 테스트)
    router.push('/movie/tt1234567');
    await router.isReady();

    wrapper = shallowMount(Header, {
      global: {
        plugins: [router, store], // main.js의 createApp .use() 와 동일한 효과
      },
    });
  });

  test('경로 정규표현식이 없는 경우, 일치하지 않습니다.', () => {
    const regExp = undefined;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });

  test('경로 정규표현식과 일치해야 합니다', () => {
    const regExp = /^\/movie/;
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  });
  test('경로 정규표현식과 일치하지 않아야 합니다.', () => {
    const regExp = /^\/heropy/;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
});
