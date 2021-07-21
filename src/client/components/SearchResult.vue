<template lang="pug">
.search-result
  search-listing(
    v-for="listing of listings"
    :key="listing.id"
    :listing="listing"
  )
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SearchListing from "./SearchListing.vue";

export default defineComponent({
  components: { SearchListing },
  computed: {
    listings() {
      return this.$store.state.listings;
    },
  },
});
</script>

<style lang="stylus" scoped>
.search-result
  border: lightgray;
  border-style: solid;
  border-width: 1px;
  border-top: none;
  height: 70vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
</style>
