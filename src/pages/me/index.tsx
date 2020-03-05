import * as React from 'react';
import { View, Button, Text } from 'react-native';
import styles from '@/styles/me';

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
        <Text>home view</Text>
        <Button title="按钮" onPress={() => console.log('Pressed')} />
      </View>
    );
  }
}
