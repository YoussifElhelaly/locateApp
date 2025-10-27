import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import backIcon from 'assets/backIcon.png';
import { useNavigation } from '@react-navigation/native';
const BackButton = () => {
  const navigate = useNavigation();
  return (
    <TouchableHighlight underlayColor={'transparent'} onPress={() => navigate.goBack()}>
      <Image source={backIcon} className="size-6 ml-3" />
    </TouchableHighlight>
  );
};

export default BackButton;
