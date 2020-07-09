import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/me';
import { Button } from '@ant-design/react-native';

export interface IMePageProps {}

export interface IMePageState {}

/**
 * @description 个人中心
 * @author 音乐码农
 * @date 2020-03-05
 * @export
 * @class MePage
 * @extends {React.Component<IMePageProps, IMePageState>}
 */
export default class MePage extends React.Component<IMePageProps, IMePageState> {
  constructor(props: IMePageProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>me view</Text>
        <Button type="primary" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </View>
    );
  }
}
