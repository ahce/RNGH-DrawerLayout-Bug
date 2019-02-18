import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import DrawerLayoutFixed from './DrawerLayoutFixed';

const navMode = 'stack'; // drawer | stack
const applyFix = false; // only works in stack navMode
const Drawer = applyFix ? DrawerLayoutFixed : DrawerLayout;

class App extends Component {
  renderNavigationView = () => (
    <View style={{ flex: 1, backgroundColor: '#FFF' }} />
  );

  renderContent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button title='zIndex bug (stack navMode)' />
      <TextInput
        defaultValue='Try to share my text (render bug)'
        style={{ width: 250, borderBottomColor: 'blue', borderBottomWidth: 1 }}
      />
    </View>
  );

  render() {
    const content = this.renderContent();

    return navMode === 'drawer' ? (
      content
    ) : (
      <Drawer
        renderNavigationView={this.renderNavigationView}
        drawerWidth={300}
        keyboardDismissMode='on-drag'
      >
        {content}
      </Drawer>
    );
  }
}

const routeConfig = { App: { screen: App } };
const AppNavigator =
  navMode === 'drawer'
    ? createDrawerNavigator(routeConfig)
    : createStackNavigator(routeConfig, { headerMode: 'none' });

export default createAppContainer(AppNavigator);
