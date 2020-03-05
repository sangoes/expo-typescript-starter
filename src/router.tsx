import { IAppState } from '@/interface/app';
import HomePage from '@/pages/home';
import MePage from '@/pages/me';
import NavigationService from '@/utils/navigationService';
import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { connect } from 'react-redux';
import { McIcons } from '@/utils';

/**
 * 构建 home stack
 */
const HomeNavigator = createStackNavigator(
  {
    // 首页
    HomePage: {
      screen: HomePage,
      navigationOptions: () => ({
        title: '首页',
      }),
    },
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions: ({}) => ({}),
  },
);

/**
 * 构建 me stack
 */
const MeNavigator = createStackNavigator(
  {
    // 个人中心
    MePage: {
      screen: MePage,
      navigationOptions: () => ({
        title: '我',
      }),
    },
  },
  {
    initialRouteName: 'MePage',
    defaultNavigationOptions: ({}) => ({}),
  },
);

/**
 * 构建Tab
 */
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: '首页',
        tabBarIcon: <McIcons name="home" size={24} />,
      },
    },
    Me: {
      screen: MeNavigator,
      navigationOptions: {
        title: '我',
        tabBarIcon: <McIcons name="account" size={24} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    shifting: true,
    barStyle: { backgroundColor: '#ffff' },
  },
);

/**
 * 构建容器
 */
const AppContainer = createAppContainer(TabNavigator);

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
