import React from 'react';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { type NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import { IconList, MultiIconList } from './IconList';
import { type IconName, IconSetList } from './IconSetList';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
});

type RootStackParamList = {
  IconExplorer: undefined;
  IconSet: { iconName: IconName; iconStyle?: string };
  MultiIconSet: { iconName: IconName };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type IconExplorerProps = NativeStackScreenProps<RootStackParamList, 'IconExplorer', 'MyStack'>;
const IconExplorer = ({ navigation: { navigate } }: IconExplorerProps) => (
  <IconSetList
    navigator={(iconName: IconName) => navigate('IconSet', { iconName })}
    multiNavigator={(iconName: IconName) => navigate('MultiIconSet', { iconName })}
  />
);

type IconSetScreenProps = NativeStackScreenProps<RootStackParamList, 'IconSet', 'MyStack'>;

const IconSetScreen = ({ route }: IconSetScreenProps) => (
  <IconList iconName={route.params.iconName} iconStyle={route.params.iconStyle} />
);

type MultiIconSetScreenProps = NativeStackScreenProps<RootStackParamList, 'MultiIconSet', 'MyStack'>;

const MultiIconSetScreen = ({ route, navigation: { navigate } }: MultiIconSetScreenProps) => (
  <MultiIconList
    iconName={route.params.iconName}
    navigator={(iconStyle: string, iconName: IconName) => navigate('IconSet', { iconStyle, iconName })}
  />
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="IconExplorer">
      <Stack.Screen name="IconExplorer" component={IconExplorer} />
      <Stack.Screen
        name="IconSet"
        component={IconSetScreen}
        options={({ route }) => ({
          title: route.params.iconStyle
            ? `${route.params.iconName} - ${route.params.iconStyle}`
            : route.params.iconName,
          headerStyle: styles.header,
        })}
      />
      <Stack.Screen
        name="MultiIconSet"
        component={MultiIconSetScreen}
        options={({ route }) => ({
          title: route.params.iconName,
          headerStyle: styles.header,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
