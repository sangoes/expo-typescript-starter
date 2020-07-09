import { YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './src';

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
YellowBox.ignoreWarnings(['Warning: ...']);

enableScreens();
export default App;
