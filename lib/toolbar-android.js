import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ToolbarAndroid,
} from './react-native';

export default function createToolbarAndroidComponent(IconNamePropType, getImageSource) {
  return class IconToolbarAndroid extends Component {
    static propTypes = {
      logoIconName: IconNamePropType,
      navIconName: IconNamePropType,
      overflowIconName: IconNamePropType,
      actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        iconName: IconNamePropType,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        show: PropTypes.oneOf(['always', 'ifRoom', 'never']),
        showWithText: PropTypes.bool,
      })),
      iconSize: PropTypes.number,
      iconColor: PropTypes.string,
    };

    static defaultProps = {
      iconSize: 24,
    };

    updateIconSources(props) {
      const size = props.iconSize;
      const color = props.iconColor || props.titleColor;
      if (props.logoName) {
        getImageSource(props.logoName, size, color)
          .then(logo => this.setState({ logo }));
      }
      if (props.navIconName) {
        getImageSource(props.navIconName, size, color)
          .then(navIcon => this.setState({ navIcon }));
      }
      if (props.overflowIconName) {
        getImageSource(props.overflowIconName, size, color)
          .then(overflowIcon => this.setState({ overflowIcon }));
      }

      Promise.all((props.actions || []).map((action) => {
        if (action.iconName) {
          return getImageSource(action.iconName, action.iconSize || size, action.iconColor || color)
            .then(icon => ({ ...action, icon }));
        }
        return Promise.resolve(action);
      })).then(actions => this.setState({ actions }));
    }

    componentWillMount() {
      this.updateIconSources(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const keys = Object.keys(IconToolbarAndroid.propTypes);
      if (!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        const stateToEvict = {};
        if (!nextProps.logoName) {
          stateToEvict.logo = undefined;
        }
        if (!nextProps.navIconName) {
          stateToEvict.navIcon = undefined;
        }
        if (!nextProps.overflowIconName) {
          stateToEvict.overflowIcon = undefined;
        }
        if (this.state && Object.keys(stateToEvict).length) {
          this.setState(stateToEvict, () => this.updateIconSources(nextProps));
        } else {
          this.updateIconSources(nextProps);
        }
      }
    }

    render() {
      return <ToolbarAndroid {...this.props} {...this.state} />;
    }
  };
}
