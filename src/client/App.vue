<template lang="pug">
.search-everywhere(:class="{ 'hidden': isHidden }")
  search-bar
  search-result
</template>

<script lang="ts">
import SearchBar from "./components/SearchBar.vue";
import SearchResult from "./components/SearchResult.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { SearchBar, SearchResult },
  computed: {
    isHidden() {
      return !this.$store.state.isVisible;
    },
  },
});
</script>

<style lang="stylus" scoped>
.search-everywhere
  font-family: sans-serif;
  max-width: 85%;
  width: 850px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2147483647;
  &.hidden
    display: none;
</style>
