import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { IconSet, IconSetList } from './IconSetList';
import { IconList, MultiIconList } from './IconList';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
});

type RootStackParamList = {
  IconExplorer: undefined;
  IconSet: { iconSet: IconSet; title: string; iconStyle?: string };
  MultiIconSet: { iconSet: IconSet; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type IconExplorerProps = NativeStackScreenProps<
  RootStackParamList,
  'IconExplorer',
  'MyStack'
>;
const IconExplorer = ({ navigation: { navigate } }: IconExplorerProps) => (
  <IconSetList
    navigator={(iconSet: IconSet, title: string) =>
      navigate('IconSet', { title, iconSet })
    }
    multiNavigator={(iconSet: IconSet, title: string) =>
      navigate('MultiIconSet', { title, iconSet })
    }
  />
);

type IconSetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'IconSet',
  'MyStack'
>;

const IconSetScreen = ({ route }: IconSetScreenProps) => (
  <IconList
    iconSet={route.params.iconSet}
    iconStyle={route.params.iconStyle}
  />
);

type MultiIconSetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MultiIconSet',
  'MyStack'
>;

const MultiIconSetScreen = ({ route, navigation: { navigate } }: MultiIconSetScreenProps) => (
  <MultiIconList
    iconSet={route.params.iconSet}
    navigator={(iconStyle: string, iconSet: IconSet, title: string) =>
      navigate('IconSet', { title, iconStyle, iconSet })
    }
  />
);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IconExplorer">
        <Stack.Screen name="IconExplorer" component={IconExplorer} />
        <Stack.Screen
          name="IconSet"
          component={IconSetScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: styles.header,
          })}
        />
        <Stack.Screen
          name="MultiIconSet"
          component={MultiIconSetScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: styles.header,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
