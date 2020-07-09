import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/home';
import { Button } from '@ant-design/react-native';

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
        <Button type="primary" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </View>
    );
  }
}
