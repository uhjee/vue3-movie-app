import { mount, shallowMount } from '@vue/test-utils';
import Parent from './Parent';

// ! mount :: 깊은 연결
test('Mount', () => {
  const wrapper = mount(Parent);
  expect(wrapper.html()).toContain('uhjee');
});

// ! shallowMount :: 얉은 연결
test('ShallowMount', () => {
  const wrapper = shallowMount(Parent);
  expect(wrapper.html()).toContain('uhjee');
});
