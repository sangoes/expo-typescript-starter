import { YellowBox } from 'react-native';
import App from './src';

export default App;

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
YellowBox.ignoreWarnings(['Warning: ...']);
