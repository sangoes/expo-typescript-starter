import NavigationService from '@/utils/navigationService';
import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { IAppState } from '@/interface/app';
import HomePage from '@/pages/home';

/**
 * 构建stack
 */
const MainNavigator = createStackNavigator(
  {
    // 首页
    HomePage: {
      screen: HomePage,
      navigationOptions: () => ({}),
    },
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions: ({}) => ({}),
  },
);
// 构建容器
const AppContainer = createAppContainer(MainNavigator);

/**
 * @description 路由Props
 * @author 驷爺.JC
 * @date 2019-12-13
 * @interface IProps
 */
interface IProps {
  app: IAppState;
  router: any;
  dispatch: any;
}

/**
 * @description 路由
 * @author 驷爺.JC
 * @date 2019-12-13
 * @class Router
 * @extends {React.PureComponent<IProps>}
 */
class Router extends React.PureComponent<IProps> {
  public render() {
    return (
      <AppContainer
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef, this.props.dispatch);
        }}
      />
    );
  }
}

function mapStateToProps(state: any) {
  return {
    router: state.router,
    app: state.app,
  };
}

export default connect(mapStateToProps)(Router);
