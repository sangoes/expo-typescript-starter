import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          按钮
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
