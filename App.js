import React from 'react';
import {
  View, Text, Button, TextInput, PermissionsAndroid, Platform
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
// import DrawerLayout from 'react-native-drawer-layout-polyfill'

class App extends React.Component {
  state = {
    count: 0
  }

  componentDidUpdate() {
    const { count } = this.state;

    if (count === 3) {
      this.checkPermissions();
    }
  }

  checkPermissions = async () => {
    const {
      check, request, PERMISSIONS: { ACCESS_FINE_LOCATION }, RESULTS: { GRANTED }
    } = PermissionsAndroid;

    if (Platform.OS === 'android' &&
      !await check(ACCESS_FINE_LOCATION) &&
      GRANTED !== await request(ACCESS_FINE_LOCATION)) {
      return false;
    }

    return true;
  }

  handleNext = () => {
    this.setState(state => ({ count: state.count + 1 }));
  }

  handleBack = () => {
    this.setState(state => ({ count: state.count - 1 }));
  }

  renderNavigationView = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
  )

  render() {
    const { count } = this.state;

    return (
      <DrawerLayout
        // contentContainerStyle={{ zIndex: 1 }}
        renderNavigationView={this.renderNavigationView}
        drawerWidth={300}
        keyboardDismissMode='on-drag'
      >
        <View style={{
          flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'
        }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{count}</Text>
            <TextInput
              defaultValue='i am a textinput'
              style={{ borderBottomColor: 'blue', borderBottomWidth: 1 }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              {count > 0 && (
                <Button
                  title='Back'
                  onPress={this.handleBack}
                />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              {count < 6 && (
                <Button
                  title='Next'
                  onPress={this.handleNext}
                />
              )}
            </View>
          </View>
        </View>
      </DrawerLayout>
    );
  }
}

const AppNavigator = createStackNavigator({
  App: {
    screen: App
  }
});

export default createAppContainer(AppNavigator);
