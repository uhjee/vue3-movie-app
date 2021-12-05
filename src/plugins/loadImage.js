/**
 * 사용자 정의 plugin
 * '$플러그인_이름' 식으로 네이밍
 *
 */

export default {
  /**
   * 사용자 정의 plugin을 vue app에 등록한다
   *
   * @param   {object}  app  현재 프로젝트에 해당하는 데이터를 매개변수로 받음
   * @return  {promise}       [return description]
   */
  install(app) {
    /**
     * $loadImage: 이미지를 로드 완료 했을 때, resolve 처리
     */
    app.config.globalProperties.$loadImage = src => {
      // 비동기로 동작시키기 위해 promise 생성
      return new Promise(resolve => {
        const img = document.createElement('img');
        img.src = src;
        // html element 기본 이벤트(load)
        img.addEventListener('load', () => {
          // 완료
          resolve();
        });
      });
    };
  },
};
