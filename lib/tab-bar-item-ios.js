import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  TabBarIOS,
} from './react-native';

export default function createTabBarItemIOSComponent(IconNamePropType, getImageSource) {
  return class TabBarItemIOS extends Component {
    static propTypes = {
      iconName: IconNamePropType.isRequired,
      selectedIconName: IconNamePropType,
      iconSize: PropTypes.number,
      iconColor: PropTypes.string,
      selectedIconColor: PropTypes.string,
    };

    static defaultProps = {
      iconSize: 30,
    };

    updateIconSources(props) {
      if (props.iconName) {
        getImageSource(props.iconName, props.iconSize, props.iconColor)
          .then(icon => this.setState({ icon }));
      }
      if (props.selectedIconName || props.selectedIconColor) {
        const selectedIconName = props.selectedIconName || props.iconName;
        const selectedIconColor = props.selectedIconColor || props.iconColor;
        getImageSource(selectedIconName, props.iconSize, selectedIconColor)
          .then(selectedIcon => this.setState({ selectedIcon }));
      }
    }

    componentWillMount() {
      this.updateIconSources(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const keys = Object.keys(TabBarItemIOS.propTypes);
      if (!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        this.updateIconSources(nextProps);
      }
    }

    render() {
      return (<TabBarIOS.Item {...this.props} {...this.state} />);
    }
  };
}
