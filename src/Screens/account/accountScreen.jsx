import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { logoutAsync } from 'redux/authSlice.js';

// Custom SVG Icons (keep your existing icons)
const PersonIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
    <Path
      d="M20 21a8 8 0 1 0-16 0"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

const LocationIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
  </Svg>
);

const OrderIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 2L7 6H3v14h18V6h-4l-2-4H9z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="13" r="2" stroke={color} strokeWidth="2" />
  </Svg>
);

const StarIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

const SettingsIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <Path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

const LogoutIcon = ({ size = 24, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 17l5-5m0 0l-5-5m5 5H9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" />
  </Svg>
);

// Menu Item Component
const MenuItem = ({ icon: Icon, title, subtitle, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center border-b border-gray-200 px-1 pb-4 my-3"
  >
    <View className="mr-4">
      <Icon size={24} color="#333" />
    </View>
    <View className="flex-1">
      <Text
        className={`font-bold text-xl mb-1 ${title === 'Logout' ? 'text-red-500' : 'text-black'}`}
      >
        {title}
      </Text>
      <Text
        className={`${title === 'Logout' ? 'text-red-500' : 'text-gray-600'}`}
      >
        {subtitle}
      </Text>
    </View>
    {title !== 'Logout' && <ChevronRightIcon />}
  </TouchableOpacity>
);

export default function AccountScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handlePress = section => {
    navigation.navigate(section);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    try {
      await dispatch(logoutAsync()).unwrap();
      setLogoutModalVisible(false);
      setIsLoggingOut(false);
    } catch (error) {
      setIsLoggingOut(false);
      setLogoutModalVisible(false);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View className="mx-5">
      <MenuItem
        icon={PersonIcon}
        title="Personal Details"
        subtitle="First name, Last name, mobile number"
        onPress={() => handlePress('PersonalDetails')}
      />

      <MenuItem
        icon={LocationIcon}
        title="Delivery address"
        subtitle="Add, edit and delete address"
        onPress={() => handlePress('DeliveryAddress')}
      />

      <MenuItem
        icon={OrderIcon}
        title="My Orders"
        subtitle="Track and view your orders"
        onPress={() => handlePress('MyOrders')}
      />

      <MenuItem
        icon={StarIcon}
        title="My Reviews"
        subtitle="All the reviews you have made"
        onPress={() => handlePress('My Reviews')}
      />

      <MenuItem
        icon={SettingsIcon}
        title="Settings"
        subtitle="Terms & Conditions and rate the app"
        onPress={() => handlePress('Settings')}
      />

      <MenuItem
        icon={props => <LogoutIcon {...props} color="#EF4444" />}
        title="Logout"
        subtitle="Sign out of your account"
        onPress={() => setLogoutModalVisible(true)}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleLogoutCancel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 24,
              width: '85%',
              maxWidth: 400,
            }}
          >
            {isLoggingOut ? (
              // Loading State
              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <ActivityIndicator size="large" color="#D4A051" />
                <Text
                  style={{
                    marginTop: 16,
                    fontSize: 16,
                    color: '#4B5563',
                  }}
                >
                  Logging out...
                </Text>
              </View>
            ) : (
              // Confirmation State
              <>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 12,
                  }}
                >
                  Logout
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6B7280',
                    marginBottom: 24,
                    lineHeight: 20,
                  }}
                >
                  Are you sure you want to logout? You'll need to login again to
                  access your account.
                </Text>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity
                    onPress={handleLogoutCancel}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#6B7280',
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogoutConfirm}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      backgroundColor: '#EF4444',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'white',
                      }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
