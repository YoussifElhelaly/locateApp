import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorage = {
    setItemString: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving string to AsyncStorage:', error);
        }
    },

    getItemString: async (key) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.error('Error getting string from AsyncStorage:', error);
            return null;
        }
    },

    setItemObject: async (key, item) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('Error saving object to AsyncStorage:', error);
        }
    },

    getItemObject: async (key) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting object from AsyncStorage:', error);
            return null;
        }
    },

    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }
    },

    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }
};

export default localStorage;
