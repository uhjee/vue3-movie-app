<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/uhjee"
      target="_blank"
      class="copyright">
      (c) {{ new Date().getFullYear() }} uhjee
    </a>
  </footer>
</template>

<script>
import Logo from '@/components/Logo';
export default {
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
  .copyright {
    font-size: 0.8rem;
  }
}
</style>
