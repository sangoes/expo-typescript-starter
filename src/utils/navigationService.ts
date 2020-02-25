import { NavigationActions } from "react-navigation";

let _navigator;
let _dispatch;

/**
 * @description 设置navigator
 * @author 驷爺.JC
 * @date 2019-12-13
 * @param {*} navigatorRef
 */
function setTopLevelNavigator(navigatorRef: any, dispatch?: any) {
  _navigator = navigatorRef;
  _dispatch = dispatch;
}

/**
 * @description 导航
 * @author 驷爺.JC
 * @date 2019-12-13
 * @param {*} routeName
 * @param {*} params
 */
function navigate(routeName: any, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

/**
 * @description 分配
 * @author 驷爺.JC
 * @date 2019-12-13
 * @returns {*}
 */
function dispatch(action: any) {
  return _dispatch(action);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  dispatch
};
