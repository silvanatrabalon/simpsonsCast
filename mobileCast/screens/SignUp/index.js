import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './SignUp.style';
import { theme } from './../../utils/theme';

const {
  colors: { primary, neutral },
  sizes: { small, medium },
} = theme;

const SignUp = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUserCheck: false,
  });

  const handleUsernameChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        username: value,
        isValidUserCheck: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        isValidUserCheck: false,
      });
    }
  };

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPasswordChange = value => {
    setData({
      ...data,
      confirmPassword: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={primary['01']} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Registrate!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.label}>Usuario</Text>
          <View style={styles.input}>
            <FontAwesome name="user-o" size={medium} />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              placeholder="consmefulanito"
              placeholderTextColor={neutral['03']}
              onChangeText={value => handleUsernameChange(value)}
            />
            {data.isValidUserCheck ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={primary['02']} size={small} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={{ marginTop: medium, ...styles.label }}>Password</Text>
          <View style={styles.input}>
            <Feather name="lock" size={medium} />
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              onChangeText={value => handlePasswordChange(value)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color={neutral['02']} size={small} />
              ) : (
                  <Feather name="eye" color={neutral['02']} size={small} />
                )}
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: medium, ...styles.label }}>Confirmar Password</Text>
          <View style={styles.input}>
            <Feather name="lock" size={medium} />
            <TextInput
              autoCapitalize="none"
              placeholder="Confirmar Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              onChangeText={value => handleConfirmPasswordChange(value)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color={neutral['02']} size={small} />
              ) : (
                  <Feather name="eye" color={neutral['02']} size={small} />
                )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <LinearGradient
                colors={[primary['01'], primary['02']]}
                style={styles.button}>
                <Text style={styles.textButton}>Ingresar</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderColor: primary['01'],
                borderWidth: 1,
                ...styles.button,
              }}>
              <Text style={styles.textButton}>Entrale!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUp;
