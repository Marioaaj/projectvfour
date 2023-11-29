import { reactive, readonly } from 'vue';

const state = reactive({
  userSession: null
});

const methods = {
  setUserSession(session) {
    state.userSession = session;
  }
};

export default {
  state: readonly(state),
  methods
};