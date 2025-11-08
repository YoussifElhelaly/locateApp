import StackNav from './src/Navigation/stackNav';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/language/i18n';
import { I18nextProvider } from 'react-i18next';
import InterceptorProvider from 'api/apiInterceptors';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react'
import getFcmToken from './src/utils/getFcmToken.js'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import addTokenNotfication from './src/features/auth/notfication.js'
import { StatusBar } from 'react-native';
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


  useEffect(() => {

    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log("restsd", remoteMessage)
    //   const channelId = await notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    //   });
    //   await notifee.displayNotification({
    //     title: remoteMessage.notification?.title,
    //     body: remoteMessage.notification?.body,
    //     android: {
    //       channelId: 'default', // Use the channel created above
    //     },
    //   });
    // })
    // return unsubscribe;
  })
  useEffect(() => {
    // getFcmToken()
  }, [])
  return (
    <Provider store={store}>
      <StatusBar translucent={false} backgroundColor={"#327eb6"}/>
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
