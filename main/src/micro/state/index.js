import { initGlobalState, MicroAppStateActions } from "qiankun";

const initialState = {
    subRoute: null,
    router: null
};
const actions = initGlobalState(initialState);

export default actions;

// actions.onGlobalStateChange((state, prev) => {
//     // state: 变更后的状态; prev 变更前的状态
//     console.log(state, prev);
// });

// actions.setGlobalState(state);
// actions.offGlobalStateChange();


