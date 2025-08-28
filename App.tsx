import StackNav from './src/Navigation/stackNav';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/language/i18n';
import { I18nextProvider } from 'react-i18next';

function App() {

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </I18nextProvider>
  );
}

export default App;
