/* eslint-disable react/no-unused-prop-types */
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ToolbarAndroid from '@react-native-community/toolbar-android';

const ICON_PROP_NAMES = ['iconSize', 'iconColor', 'titleColor'];
const LOGO_ICON_PROP_NAMES = [...ICON_PROP_NAMES, 'logoName'];
const NAV_ICON_PROP_NAMES = [...ICON_PROP_NAMES, 'navIconName'];
const OVERFLOW_ICON_PROP_NAMES = [...ICON_PROP_NAMES, 'overflowIconName'];
const ACTIONS_PROP_NAMES = [...ICON_PROP_NAMES, 'actions'];

const arePropsEqual = keys => (prevProps, nextProps) =>
  isEqual(pick(prevProps, keys), pick(nextProps, keys));

const areLogoIconPropsEqual = arePropsEqual(LOGO_ICON_PROP_NAMES);
const areNavIconPropsEqual = arePropsEqual(NAV_ICON_PROP_NAMES);
const areOverflowIconPropsEqual = arePropsEqual(OVERFLOW_ICON_PROP_NAMES);
const areActionPropsEqual = arePropsEqual(ACTIONS_PROP_NAMES);

export default function createToolbarAndroidComponent(
  IconNamePropType,
  getImageSource
) {
  return class IconToolbarAndroid extends PureComponent {
    static propTypes = {
      logoName: IconNamePropType,
      navIconName: IconNamePropType,
      overflowIconName: IconNamePropType,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          iconName: IconNamePropType,
          iconSize: PropTypes.number,
          iconColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          show: PropTypes.oneOf(['always', 'ifRoom', 'never']),
          showWithText: PropTypes.bool,
        })
      ),
      iconSize: PropTypes.number,
      iconColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      titleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
      iconSize: 24,
    };

    state = {
      logo: undefined,
      navIcon: undefined,
      overflowIcon: undefined,
      actions: undefined,
    };

    componentDidMount() {
      this.updateLogoIconSource();
      this.updateNavIconSource();
      this.updateOverflowIconSource();
      this.updateActionIconSources();
    }

    componentDidUpdate(prevProps) {
      if (!areLogoIconPropsEqual(prevProps, this.props)) {
        this.updateLogoIconSource();
      }
      if (!areNavIconPropsEqual(prevProps, this.props)) {
        this.updateNavIconSource();
      }
      if (!areOverflowIconPropsEqual(prevProps, this.props)) {
        this.updateOverflowIconSource();
      }
      if (!areActionPropsEqual(prevProps, this.props)) {
        this.updateActionIconSources();
      }
    }

    async updateLogoIconSource() {
      const { logoName, iconSize, iconColor, titleColor } = this.props;
      if (logoName) {
        const logo = await getImageSource(
          logoName,
          iconSize,
          iconColor || titleColor
        );
        this.setState({ logo });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.logo) {
        this.setState({ logo: undefined });
      }
    }

    async updateNavIconSource() {
      const { navIconName, iconSize, iconColor, titleColor } = this.props;
      if (navIconName) {
        const navIcon = await getImageSource(
          navIconName,
          iconSize,
          iconColor || titleColor
        );
        this.setState({ navIcon });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.navIcon) {
        this.setState({ navIcon: undefined });
      }
    }

    async updateOverflowIconSource() {
      const { overflowIconName, iconSize, iconColor, titleColor } = this.props;
      if (overflowIconName) {
        const overflowIcon = await getImageSource(
          overflowIconName,
          iconSize,
          iconColor || titleColor
        );
        this.setState({ overflowIcon });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.overflowIcon) {
        this.setState({ overflowIcon: undefined });
      }
    }

    async updateActionIconSources() {
      const { actions, iconSize, iconColor, titleColor } = this.props;
      const updatedActions = await Promise.all(
        (actions || []).map(action => {
          if (action.iconName) {
            return getImageSource(
              action.iconName,
              action.iconSize || iconSize,
              action.iconColor || iconColor || titleColor
            ).then(icon => ({ ...action, icon }));
          }
          return Promise.resolve(action);
        })
      );
      this.setState({ actions: updatedActions });
    }

    render() {
      return <ToolbarAndroid {...this.props} {...this.state} />;
    }
  };
}
