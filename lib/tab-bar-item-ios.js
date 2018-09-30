/* eslint-disable react/no-unused-prop-types */
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from './react-native';

const ICON_PROP_NAMES = ['iconName', 'iconSize', 'iconColor'];
const SELECTED_ICON_PROP_NAMES = [
  ...ICON_PROP_NAMES,
  'selectedIconName',
  'selectedIconColor',
];

const arePropsEqual = keys => (prevProps, nextProps) =>
  isEqual(pick(prevProps, keys), pick(nextProps, keys));

const areIconPropsEqual = arePropsEqual(ICON_PROP_NAMES);
const areSelectedIconPropsEqual = arePropsEqual(SELECTED_ICON_PROP_NAMES);

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

    state = {
      icon: undefined,
      selectedIcon: undefined,
    };

    componentDidMount() {
      this.updateIconSource();
      this.updateSelectedIconSource();
    }

    componentDidUpdate(prevProps) {
      if (!areIconPropsEqual(prevProps, this.props)) {
        this.updateIconSource();
      }
      if (!areSelectedIconPropsEqual(prevProps, this.props)) {
        this.updateSelectedIconSource();
      }
    }

    async updateIconSource() {
      const { iconName, iconSize, iconColor } = this.props;
      if (iconName) {
        const icon = await getImageSource(iconName, iconSize, iconColor);
        this.setState({ icon });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.icon) {
        this.setState({ icon: undefined });
      }
    }

    async updateSelectedIconSource() {
      const {
        iconName,
        iconColor,
        iconSize,
        selectedIconName,
        selectedIconColor,
      } = this.props;
      if (selectedIconName || selectedIconColor) {
        const selectedIcon = await getImageSource(
          selectedIconName || iconName,
          iconSize,
          selectedIconColor || iconColor
        );
        this.setState({ selectedIcon });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.selectedIcon) {
        this.setState({ selectedIcon: undefined });
      }
    }

    render() {
      return <TabBarIOS.Item {...this.state} {...this.props} />;
    }
  };
}
