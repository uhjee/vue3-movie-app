export default {
  namespaced: true,
  /**
   * !state:  데이터의 불변성을 위해 함수로 한번 감싸서 return(closure)
   * @return  {[type]}  [return description]
   */
  state: () => ({
    name: 'uhjee',
    email: 'oper1490@gmail.com',
    blog: 'https://aaa.aaa',
    phone: '+82-10-1111-1111',
    image: 'https://avatars.githubusercontent.com/u/51398029?v=4'
  }),
};
