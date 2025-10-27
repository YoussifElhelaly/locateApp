import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
  Modal,
} from 'react-native';
import BackButton from 'components/BackButton.jsx';
import Svg, { Path, Circle } from 'react-native-svg';

// SVG Icons (same as before)
const DocumentIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const ShareIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" />
    <Path
      d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
      stroke={color}
      strokeWidth="2"
    />
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

const ChevronRightIcon = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" />
  </Svg>
);

const CloseIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
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
      <Text className="font-bold text-xl mb-1 text-black">{title}</Text>
      <Text className="text-gray-600">{subtitle}</Text>
    </View>
    <ChevronRightIcon />
  </TouchableOpacity>
);

// Terms & Conditions Content
const TermsContent = () => (
  <ScrollView className="flex-1 p-5">
    <Text className="text-2xl font-bold mb-4">Terms & Conditions</Text>
    <Text className="text-base mb-4">
      Welcome to Locate E-Commerce Platform
    </Text>
    <Text className="text-base mb-4">
      By using this platform, you agree to comply with the following terms and
      conditions:
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">1. Use of Platform</Text>
    <Text className="text-base mb-4">
      You may use the platform for personal and lawful purposes only. It is
      prohibited to use the platform for any illegal or prohibited purposes.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">2. User Account</Text>
    <Text className="text-base mb-4">
      You are responsible for maintaining the confidentiality of your account
      information and password. Any activity under your account is your full
      responsibility.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">3. Orders and Payments</Text>
    <Text className="text-base mb-4">
      All orders are subject to availability. Prices are subject to change
      without prior notice. Payments are made through secure and approved
      methods.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">4. Delivery</Text>
    <Text className="text-base mb-4">
      We strive to deliver your orders on time. Delays may occur due to
      circumstances beyond our control.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">
      5. Cancellation and Returns
    </Text>
    <Text className="text-base mb-4">
      You can cancel your order before it is shipped. Return policy is subject
      to each store's individual terms.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">
      6. Intellectual Property Rights
    </Text>
    <Text className="text-base mb-4">
      All content on the platform is protected by copyright and intellectual
      property rights of Locate Platform.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">7. Liability</Text>
    <Text className="text-base mb-4">
      We are not responsible for any direct or indirect damages resulting from
      the use of the platform.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">8. Modifications</Text>
    <Text className="text-base mb-4">
      We reserve the right to modify these terms at any time. Your continued use
      of the platform means your acceptance of the modifications.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">9. Governing Law</Text>
    <Text className="text-base mb-4">
      These terms are subject to the laws of the Kingdom of Saudi Arabia.
    </Text>

    <Text className="text-base mb-6">
      For inquiries:{' '}
      <Text
        className="text-blue-600"
        onPress={() => Linking.openURL('mailto:info@locate.sa')}
      >
        info@locate.sa
      </Text>
    </Text>
  </ScrollView>
);

// Privacy Policy Content
const PrivacyContent = () => (
  <ScrollView className="flex-1 p-5">
    <Text className="text-2xl font-bold mb-4">Privacy Policy</Text>
    <Text className="text-base mb-4">Privacy Policy for Locate Platform</Text>
    <Text className="text-base mb-4">
      At Locate Platform, we are committed to protecting your privacy. This
      policy explains how we collect, use, and protect your personal
      information.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">
      1. Information We Collect
    </Text>
    <Text className="text-base mb-2">
      We collect the following information:
    </Text>
    <Text className="text-base mb-1">
      • Registration information: name, email, phone number
    </Text>
    <Text className="text-base mb-1">
      • Order information: delivery addresses, payment details
    </Text>
    <Text className="text-base mb-1">
      • Usage information: browsing and search logs
    </Text>
    <Text className="text-base mb-4">
      • Location information: to display nearby stores
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">
      2. How We Use Information
    </Text>
    <Text className="text-base mb-2">
      We use your information for the following purposes:
    </Text>
    <Text className="text-base mb-1">
      • Processing and fulfilling your orders
    </Text>
    <Text className="text-base mb-1">
      • Improving our services and user experience
    </Text>
    <Text className="text-base mb-1">
      • Communicating with you about your orders and offers
    </Text>
    <Text className="text-base mb-4">
      • Personalizing content and recommendations
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">3. Information Sharing</Text>
    <Text className="text-base mb-2">
      We do not sell your personal information. We may share your information
      with:
    </Text>
    <Text className="text-base mb-1">
      • Partner stores to fulfill your orders
    </Text>
    <Text className="text-base mb-1">
      • Payment and delivery service providers
    </Text>
    <Text className="text-base mb-4">• Legal authorities when necessary</Text>

    <Text className="text-lg font-bold mt-4 mb-2">4. Information Security</Text>
    <Text className="text-base mb-4">
      We use the latest encryption and security technologies to protect your
      information. Data is stored on secure servers with regular backups.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">5. Your Rights</Text>
    <Text className="text-base mb-2">You have the right to:</Text>
    <Text className="text-base mb-1">• Access your personal information</Text>
    <Text className="text-base mb-1">• Correct or update your information</Text>
    <Text className="text-base mb-1">
      • Delete your account and information
    </Text>
    <Text className="text-base mb-4">
      • Opt-out of marketing communications
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">6. Cookies</Text>
    <Text className="text-base mb-4">
      We use cookies to improve your experience. You can control cookie settings
      from your browser.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">7. Children's Privacy</Text>
    <Text className="text-base mb-4">
      Our services are not directed to children under 18. We do not knowingly
      collect information from children.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">8. Policy Updates</Text>
    <Text className="text-base mb-4">
      We may update this policy from time to time. We will notify you of any
      material changes.
    </Text>

    <Text className="text-lg font-bold mt-4 mb-2">9. Contact Us</Text>
    <Text className="text-base mb-2">
      For inquiries about the privacy policy, please contact us:
    </Text>
    <Text className="text-base mb-1">
      Email:{' '}
      <Text
        className="text-blue-600"
        onPress={() => Linking.openURL('mailto:privacy@locate.sa')}
      >
        privacy@locate.sa
      </Text>
    </Text>
    <Text className="text-base mb-1">Phone: +966 XX XXX XXXX</Text>
    <Text className="text-base mb-6">
      Last updated: {new Date().toLocaleDateString('en-US')}
    </Text>
  </ScrollView>
);

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          'Check out Locate App! Download it now: https://www.locateksa.com',
        title: 'Share Locate App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRateApp = () => {
    const storeUrl =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/app/idYOUR_APP_ID'
        : 'https://play.google.com/store/apps/details?id=com.yourapp';

    Linking.openURL(storeUrl).catch(err =>
      console.error('Error opening store:', err),
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      

      <View className="mx-5">
        <MenuItem
          icon={DocumentIcon}
          title="Terms & Conditions"
          subtitle="Read our terms and conditions"
          onPress={() => openModal(<TermsContent />, 'Terms & Conditions')}
        />

        <MenuItem
          icon={DocumentIcon}
          title="Privacy Policy"
          subtitle="Learn how we protect your data"
          onPress={() => openModal(<PrivacyContent />, 'Privacy Policy')}
        />

        <MenuItem
          icon={ShareIcon}
          title="Share App"
          subtitle="Share Locate with friends"
          onPress={handleShareApp}
        />

        <MenuItem
          icon={StarIcon}
          title="Rate the App"
          subtitle="Rate us on the App Store"
          onPress={handleRateApp}
        />
      </View>

      {/* Modal for Terms & Privacy - 80% Height */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              height: '80%',
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">
                {modalTitle}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-2"
              >
                <CloseIcon size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {modalContent}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
