import { Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// Custom SVG Icons
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

const CoinsIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="2" />
    <Path
      d="M18.09 10.37A6 6 0 1 1 10.37 18.09"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M12 8h-4" stroke={color} strokeWidth="2" />
    <Path d="M8 12h8" stroke={color} strokeWidth="2" />
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
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 -1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      strokeWidth="2"
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
      <Text className="font-bold text-xl mb-1">{title}</Text>
      <Text className="text-gray-600">{subtitle}</Text>
    </View>
    <ChevronRightIcon />
  </TouchableOpacity>
);

export default function AccountScreen() {
  const handlePress = section => {
    console.log(`Pressed ${section}`);
  };

  return (
    <View className="mx-5">
      <MenuItem
        icon={PersonIcon}
        title="Personal Details"
        subtitle="First name, Last name, mobile number"
        onPress={() => handlePress('Personal Details')}
      />

      <MenuItem
        icon={LocationIcon}
        title="Delivery address"
        subtitle="Add, edit and delete address"
        onPress={() => handlePress('Delivery address')}
      />

      <MenuItem
        icon={CoinsIcon}
        title="My LocatePoints"
        subtitle="Manage your LocatePoints"
        onPress={() => handlePress('My LocatePoints')}
      />

      <MenuItem
        icon={StarIcon}
        title="My Reviews"
        subtitle="All the reviews you have made"
        onPress={() => handlePress('My Reviews')}
      />

      <MenuItem
        icon={SettingsIcon}
        title="Setting"
        subtitle="Languages, search and nearby"
        onPress={() => handlePress('Setting')}
      />
    </View>
  );
}
