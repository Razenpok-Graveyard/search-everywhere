<template lang="pug">
.search-bar
  search-icon(class="icon")
  input(
    ref="input"
    class="input"
    @input="input"
    @keypress="keypress"
    @keydown="keydown"
    @keyup="keyup"
  )
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Action } from "../store/action-types";
import SearchIcon from "../assets/search-icon.svg";

export default defineComponent({
  components: {
    SearchIcon,
  },
  computed: {
    isVisible() {
      return this.$store.state.isVisible;
    },
  },
  watch: {
    isVisible(value: boolean) {
      this.$nextTick(() => {
        const input = this.getInputElement();
        if (value) {
          input.focus();
          input.select();
        } else {
          input.blur();
        }
      });
    },
  },
  methods: {
    getInputElement(): HTMLInputElement {
      return <HTMLInputElement>this.$refs["input"];
    },
    input() {
      this.$store.dispatch(Action.SEARCH, this.getInputElement().value);
    },
    keyup(event: KeyboardEvent) {
      event.stopPropagation();
    },
    keypress(event: KeyboardEvent) {
      event.stopPropagation();
    },
    keydown(event: KeyboardEvent) {
      event.stopPropagation();
      const action = this.matchCustomInputAction(event.key);
      if (action !== undefined) {
        event.preventDefault();
        this.$store.dispatch(action);
      }
    },
    matchCustomInputAction(key: string) {
      switch (key) {
        case "Enter":
          return Action.OPEN_SELECTED_LISTING;
        case "Escape":
          return Action.HIDE;
        case "Down":
          return Action.MOVE_DOWN;
        case "ArrowDown":
          return Action.MOVE_DOWN;
        case "Up":
          return Action.MOVE_UP;
        case "ArrowUp":
          return Action.MOVE_UP;
      }
      return undefined;
    },
  },
});
</script>

<style lang="stylus" scoped>
.search-bar
  background-color: white;
  border: lightgray;
  border-style: solid;
  border-width: 1px;
  display: flex;
  padding: 2px;
  .icon
    margin: 5px;
  .input
    flex: 1 1;
    border: none;
    outline: none;
    :focus
      border: none;
      outline: none;
</style>
