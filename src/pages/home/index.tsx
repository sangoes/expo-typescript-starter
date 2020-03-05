import * as React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '@/styles/home';

export interface IHomePageProps {}

export interface IHomePageState {}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
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
