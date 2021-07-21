<template lang="pug">
.search-listing(:class="{ selected: isSelected }" @click="open")
  img(class="icon" :src="listing.icon")
  .info
    .title {{ listing.title }}
    .details {{ listing.details }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchListing } from "../../shared/search-listing";
import { Action } from "../store/action-types";

export default defineComponent({
  props: {
    listing: {
      type: Object as PropType<SearchListing>,
      required: true,
    },
  },
  computed: {
    isSelected(): boolean {
      return this.$store.getters.selectedListingId === this.listing.id;
    },
  },
  watch: {
    isSelected(value: boolean) {
      if (value) {
        const el = <HTMLElement>this.$el;
        let targetRect = el.getBoundingClientRect();
        let containerRect = el.parentElement!.getBoundingClientRect();
        if (targetRect.bottom > containerRect.bottom) {
          el.scrollIntoView(false);
        }
        if (targetRect.top < containerRect.top) {
          el.scrollIntoView();
        }
      }
    },
  },
  methods: {
    open() {
      this.$store.dispatch(Action.OPEN_LISTING, this.listing.id);
    },
  },
});
</script>

<style lang="stylus" scoped>
.search-listing
  width 100%
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;

  &.selected
    background-color: skyblue;

  .icon
    width: 24px;
    height: 24px;
    margin: 5px;

  .info
    width 100%
    display: flex;
    flex-direction: column;
    user-select: none;

    .truncated
      width: calc(100% - 40px);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

    .title
      @extend .truncated;
      font-size: 12px;

    .details
      @extend .truncated;
      font-size: 10px;
      color: gray;
</style>
