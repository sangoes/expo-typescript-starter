import { YellowBox } from 'react-native';
import App from './src';

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
YellowBox.ignoreWarnings(['Warning: ...']);

export default App;
