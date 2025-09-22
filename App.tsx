import StackNav from './src/Navigation/stackNav';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/language/i18n';
import { I18nextProvider } from 'react-i18next';
import InterceptorProvider from 'api/apiInterceptors';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <InterceptorProvider>
              <StackNav />
            </InterceptorProvider>
          </NavigationContainer>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
