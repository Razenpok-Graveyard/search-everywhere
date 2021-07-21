import { State } from "./state";
import { ActionContext } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { Store, CommitOptions, DispatchOptions } from "vuex";

type Getters = typeof getters;
type Mutations = typeof mutations;
type Actions = typeof actions;

type TypedGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

type TypedCommit = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

type NoPayloadActions = keyof {
  [K in keyof Actions as Parameters<Actions[K]>[1] extends undefined
    ? K
    : never]: Actions[K];
};

type PayloadActions = keyof Omit<Actions, NoPayloadActions>;

type TypedDispatch = {
  dispatch<K extends NoPayloadActions>(
    key: K,
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
  dispatch<K extends PayloadActions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

type Typed<T> = Omit<T, "commit" | "getters" | "dispatch"> &
  TypedCommit &
  TypedDispatch &
  TypedGetters;

export type TypedStore = Typed<Store<State>>;
export type TypedActionContext = Typed<ActionContext<State, State>>;
