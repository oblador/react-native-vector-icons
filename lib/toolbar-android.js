import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ToolbarAndroid,
} from 'react-native';

export default function createToolbarAndroidComponent(IconNamePropType, getImageSource) {
  return class IconToolbarAndroid extends Component {
    static propTypes = {
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
    }

    updateIconSources(props) {
      const size = props.iconSize;
      const color = props.iconColor || props.titleColor;
      if (props.navIconName) {
        getImageSource(props.navIconName, size, color).then(navIcon => this.setState({ navIcon }));
      }
      if (props.overflowIconName) {
        getImageSource(props.overflowIconName, size, color).then(overflowIcon => this.setState({ overflowIcon }));
      }

      Promise.all((props.actions || []).map(action => {
        if (action.iconName) {
          return getImageSource(action.iconName, action.iconSize || size, action.iconColor || color).then(icon => ({
            ...action,
            icon,
          }));
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
        let stateToEvict = [];
        if (!nextProps.navIconName) {
          stateToEvict.push('navIcon');
        }
        if (!nextProps.iconName) {
          stateToEvict.push('icon');
        }
        if (this.state && stateToEvict.length) {
          this.replaceState(omit(this.state, stateToEvict), () => this.updateIconSources(nextProps));
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
