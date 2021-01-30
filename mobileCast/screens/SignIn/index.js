import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from './../../components/context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Users from './../../model/users';
import {styles} from './SignIn.style';
import {theme} from './../../utils/theme';

const {
  colors: {primary, neutral},
  sizes: {small, medium},
} = theme;

const SignIn = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [data, setData] = useState({
    username: '',
    password: '',
    isValidUser: true,
    secureTextEntry: true,
    isValidPassword: true,
    isValidUserCheck: false,
  });

  const handleUsernameChange = value => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        username: value,
        isValidUser: true,
        isValidUserCheck: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        isValidUser: false,
        isValidUserCheck: false,
      });
    }
  };

  const handlePasswordChange = value => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = value => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleLogin = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName === item.username && password === item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Usted no aprende, verdad?',
        'Ni usuario, ni contraseña pueden estar vacios.',
        [{text: 'Ouh'}],
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert(
        'Usuario inválido!',
        'El usuario o la contraseña es incorrecta.',
        [{text: 'Ouh'}],
      );
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={primary['01']} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Entrale!</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <Text style={styles.label}>Usuario</Text>
        <View style={styles.input}>
          <FontAwesome name='user-o' size={medium} />
          <TextInput
            autoCapitalize='none'
            style={styles.textInput}
            placeholder='consmefulanito'
            placeholderTextColor={neutral['03']}
            onChangeText={value => handleUsernameChange(value)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.isValidUserCheck ? (
            <Animatable.View animation='bounceIn'>
              <Feather name='check-circle' color={primary['02']} size={small} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMsg}>Ingrese al menos 4 caracteres.</Text>
          </Animatable.View>
        )}

        <Text style={{marginTop: medium, ...styles.label}}>Password</Text>
        <View style={styles.input}>
          <Feather name='lock' size={medium} />
          <TextInput
            autoCapitalize='none'
            style={styles.textInput}
            placeholder='contraseña'
            placeholderTextColor={neutral['03']}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={value => handlePasswordChange(value)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name='eye-off' color={neutral['02']} size={small} />
            ) : (
              <Feather name='eye' color={neutral['02']} size={small} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMsg}>Ingrese al menos 8 caracteres.</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={styles.textAnchor}>¿Olvidaste tu password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleLogin(data.username, data.password);
            }}>
            <LinearGradient
              colors={[primary['01'], primary['02']]}
              style={styles.button}>
              <Text style={styles.textButton}>Ingresar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              borderColor: primary['01'],
              borderWidth: 1,
              ...styles.button,
            }}>
            <Text style={styles.textButton}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignIn;
