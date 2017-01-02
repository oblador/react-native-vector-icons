import React, { Component } from 'react';
import {
  Alert,
  Image,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from './react-native';

import dismissKeyboard from 'dismissKeyboard';

import _ from 'lodash';

import IconList from './IconList';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo';
import EvilIconsGlyphs from 'react-native-vector-icons/glyphmaps/EvilIcons';
import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome';
import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation';
import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons';
import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons';
import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons';
import ZocialGlyphs from 'react-native-vector-icons/glyphmaps/Zocial';

const GLYPH_MAPS = {
  Entypo: EntypoGlyphs,
  EvilIcons: EvilIconsGlyphs,
  FontAwesome: FontAwesomeGlyphs,
  Foundation: FoundationGlyphs,
  Ionicons: IoniconsGlyphs,
  MaterialIcons: MaterialIconsGlyphs,
  MaterialCommunityIcons: MaterialCommunityIconsGlyphs,
  Octicons: OcticonsGlyphs,
  Zocial: ZocialGlyphs,
};

const ICON_SETS = _.map({
  Entypo,
  EvilIcons,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial,
}, (component, name) => ({ name, component }))
.map(iconSet => {
  // Some icons have multiple names, so group them by glyph
  const glyphMap = GLYPH_MAPS[iconSet.name];
  iconSet.glyphs = _.values(_.groupBy(Object.keys(glyphMap), name => glyphMap[name]));
  return iconSet;
});

const BUTTONS = [
  {
    text: 'Login with Facebook',
    icon: 'facebook',
    backgroundColor: '#3b5998',
  },
  {
    text: 'Follow me on Twitter',
    icon: 'twitter',
    backgroundColor: '#55acee',
  },
  {
    text: 'Fork on GitHub',
    icon: 'code-fork',
    backgroundColor: '#ccc',
    color: '#000',
  },
];

const STYLING = [
  { name: 'github', size: 40, color: '#333' },
  { name: 'heart', size: 30, color: 'white', containerStyle: {
    backgroundColor: '#e0284f',
    borderRadius: 23,
    paddingHorizontal: 8,
    paddingTop: 9,
    paddingBottom: 7,
  } },
  { name: 'star', size: 20, color: '#FF0000', containerStyle: {
    borderRadius: 20,
    padding: 7,
    borderWidth: 3,
    backgroundColor: '#FFDD00',
    borderColor: '#165E00',
  } },
  { name: 'font', size: 20, color: 'white', containerStyle: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#47678e',
  } },
];

const INLINE = [
  (<Text>This text has <FontAwesome name="rocket" /> inline <FontAwesome name="hand-peace-o"> icons!</FontAwesome></Text>),
];

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  text: {
    flex: 6,
  },
  glyphCount: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default class IconSetsList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        iconSets: ICON_SETS,
        buttons: BUTTONS,
        inline: INLINE,
        styling: STYLING,
      }),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSectionHeader={(data, section) => this._renderSectionHeader(data, section)}
        renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
        initialListSize={15}
      />
    );
  }

  _renderSectionHeader(data, section) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.toUpperCase()}
        </Text>
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    switch (sectionID) {
      case 'iconSets': return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="#eee">
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {rowData.name}
              </Text>
              <Text style={styles.glyphCount}>
                {rowData.glyphs.length}
              </Text>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
      case 'buttons': return (
        <View>
          <View style={styles.row}>
            <FontAwesome.Button name={rowData.icon} backgroundColor={rowData.backgroundColor} color={rowData.color} onPress={() => Alert.alert('You pressed "' + rowData.text + '"')}>{rowData.text}</FontAwesome.Button>
          </View>
          <View style={styles.separator} />
        </View>
      );
      case 'styling':
        return (
          <View>
            <View style={styles.row}>
              <View style={rowData.containerStyle}>
                <FontAwesome {...rowData} />
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        );
      case 'inline':
        return (
          <View>
            <View style={styles.row}>
              {rowData}
            </View>
            <View style={styles.separator} />
          </View>
        );
      default: return false;
    }
  }

  _pressRow(rowID) {
    const iconSet = ICON_SETS[rowID];
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: iconSet.name,
        component: IconList,
        passProps: { iconSet },
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: iconSet.name,
        name: 'iconSet',
        iconSet,
      });
    }
  }
}
