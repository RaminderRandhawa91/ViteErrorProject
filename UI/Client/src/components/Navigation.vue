<!--Main navigation bar for the application-->
<template>
  <nav ref="root" class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark navbar-custom">
    <div class="container-fluid">
      <a href="./page1.html" class="navbar-brand pl-1">
        <img src="/images/logo-header.png?url" height="25" class="d-inline-block align-top" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="gap:5px">
          <li class="nav-item">
            <a class="nav-link" href="./page1.html">Page1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./page2.html">Page2 </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent } from "vue";

export default defineComponent({
  components: { },
  setup() {
    const { t } = useI18n(); // call `useI18n`, and spread `t` from  `useI18n` returning
    return {  t};
  },
});
</script>
<style scoped>
.nav-item .nav-link {
  color: white;
}

.nav-item:hover {
  font-weight: bold;
}
</style>
