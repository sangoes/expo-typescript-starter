import { Colors } from '@/styles';
import { IAppState } from '@/interface/app';
import HomePage from '@/pages/home';
import MePage from '@/pages/me';
import { McIcons } from '@/utils';
import { sh, sw } from '@/utils/dimension';
import NavigationService from '@/utils/navigationService';
import { Provider } from '@ant-design/react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';

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
const TabNavigator = createBottomTabNavigator(
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

interface IState {
  theme: any;
  isReady: boolean;
}

/**
 * @description 路由
 * @author 驷爺.JC
 * @date 2019-12-13
 * @class Router
 * @extends {React.PureComponent<IProps>}
 */
class Router extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      theme: {
        brand_primary: Colors.blue800,
      },
      isReady: false,
    };
  }

  /**
   * @description mount
   * @author jerry.c
   * @date 2020-07-09
   * @memberof Router
   */
  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  /**
   * @description prepare
   * @private
   * @memberof Router
   */
  private prepareResources = async () => {
    // antd icons
    await Font.loadAsync(
      'antoutline',
      require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    );
    await Font.loadAsync('antfill', require('@ant-design/icons-react-native/fonts/antfill.ttf'));
    // setting ready
    this.setState({ isReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  /**
   * @description return
   * @author jerry.c
   * @date 2020-07-09
   * @returns
   * @memberof Router
   */
  public render() {
    const { theme, isReady } = this.state;
    if (!isReady) {
      return (
        <View style={styles.splashView}>
          {/* <Image
            style={styles.splashImage}
            resizeMode="cover"
            source={require('@assets/splash.png')}
            // onLoad={this._cacheResourcesAsync}
          /> */}
        </View>
      );
    }
    return (
      <Provider theme={theme}>
        <AppContainer
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef, this.props.dispatch);
          }}
        />
      </Provider>
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

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  splashImage: {
    width: sw,
    height: sh,
  },
});
