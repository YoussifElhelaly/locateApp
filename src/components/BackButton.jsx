import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import backIcon from 'assets/backIcon.jpg';
import { useNavigation } from '@react-navigation/native';
const BackButton = () => {
  const navigate = useNavigation();
  return (
    <TouchableHighlight onPress={() => navigate.goBack()}>
      <Image source={backIcon} className="size-8 ml-3" />
    </TouchableHighlight>
  );
};

export default BackButton;
