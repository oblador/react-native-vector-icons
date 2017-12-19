/* eslint-disable react/no-unused-prop-types */
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from './react-native';

export default function createTabBarItemIOSComponent(
  IconNamePropType,
  getImageSource
) {
  return class TabBarItemIOS extends PureComponent {
    static propTypes = {
      iconName: IconNamePropType.isRequired,
      selectedIconName: IconNamePropType,
      iconSize: PropTypes.number,
      iconColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selectedIconColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    };

    static defaultProps = {
      iconSize: 30,
    };

    componentWillMount() {
      this.updateIconSources(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const keys = Object.keys(TabBarItemIOS.propTypes);
      if (!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        this.updateIconSources(nextProps);
      }
    }

    updateIconSources(props) {
      if (props.iconName) {
        getImageSource(
          props.iconName,
          props.iconSize,
          props.iconColor
        ).then(icon => this.setState({ icon }));
      }
      if (props.selectedIconName || props.selectedIconColor) {
        const selectedIconName = props.selectedIconName || props.iconName;
        const selectedIconColor = props.selectedIconColor || props.iconColor;
        getImageSource(
          selectedIconName,
          props.iconSize,
          selectedIconColor
        ).then(selectedIcon => this.setState({ selectedIcon }));
      }
    }

    render() {
      return <TabBarIOS.Item {...this.props} {...this.state} />;
    }
  };
}
