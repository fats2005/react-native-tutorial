import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";

import DefaultInput from "../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../components/UI/HeadingText/HeadingText";
import MaintText from "../components/UI/MainText/MainText";
import ButtonWithBackground from "../components/UI/ButtonWithBackground/ButtonWithBackground";

import backgroundImage from "../assets/background.jpg";
import validate from "../utility/validation";

import { connect } from "react-redux";
import { tryAuth } from "../store/actions";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").width < 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);

    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.width < 500 ? "portrait" : "landscape"
    });
  };

  authHandler = () => {
    const { controls, authMode } = this.state;

    const authData = {
      email: controls.email.value,
      password: controls.password.value
    };
    this.props.onTryAuth(authData, authMode);
  };

  updateInputState = (key, value) => {
    const { controls } = this.state;
    let connectedValue = {};

    if (controls[key].validationRules.equalTo) {
      const equalTo = controls[key].validationRules.equalTo;
      const equalValue = controls[equalTo].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordConstrol = null;
    const { isLoading } = this.props;
    const { controls, viewMode, authMode } = this.state;
    let loginButton = isLoading ? (
      <ActivityIndicator />
    ) : (
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.authHandler}
        disabled={
          (!controls.confirmPassword.valid && authMode === "signup") ||
          !controls.email.valid ||
          !controls.password.valid
        }
      >
        Login
      </ButtonWithBackground>
    );

    if (viewMode === "portrait")
      headingText = (
        <MaintText>
          <HeadingText>Please Log In</HeadingText>
        </MaintText>
      );

    if (authMode === "signup") {
      confirmPasswordConstrol = (
        <View
          style={
            viewMode === "portrait"
              ? styles.ptPasswordWrapper
              : styles.lsPasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={controls.confirmPassword.valid}
            touched={controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-mail Address"
                style={styles.input}
                value={controls.email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={controls.email.valid}
                touched={controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  viewMode === "portrait" || authMode === "login"
                    ? styles.ptPasswordContainer
                    : styles.lsPasswordContainer
                }
              >
                <View
                  style={
                    viewMode === "portrait" || authMode === "login"
                      ? styles.ptPasswordWrapper
                      : styles.lsPasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={controls.password.value}
                    onChangeText={val => this.updateInputState("password", val)}
                    valid={controls.password.valid}
                    touched={controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordConstrol}
              </View>
            </View>
          </TouchableWithoutFeedback>

          {loginButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  ptPasswordContainer: {
    flexDirection: "column"
  },
  lsPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ptPasswordWrapper: {
    width: "100%"
  },
  lsPasswordWrapper: {
    width: "45%"
  }
});

mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
