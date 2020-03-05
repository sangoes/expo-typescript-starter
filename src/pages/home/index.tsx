import * as React from 'react';
import { View } from 'react-native';
import styles from '@/styles/home';
import { Button, Text } from 'react-native-paper';

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
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </View>
    );
  }
}
