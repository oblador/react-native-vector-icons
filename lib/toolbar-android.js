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
      actions: [],
    };

    constructor(props) {
      super(props);
      this.updateIconSources(props);
      this.state = {
        navIcon: undefined,
        overflowIcon: undefined,
        actions: undefined,
        ready: false,
      };
    }

    updateIconSources(props) {
      const size = props.iconSize;
      const color = props.iconColor || props.titleColor;

      let allPromises = props.actions.map(action => {
        if (action.iconName) {
          return getImageSource(action.iconName, action.iconSize || size, action.iconColor || color);
        }
        return Promise.resolve(null);
      });

      if (props.navIconName) {
        allPromises.push(getImageSource(props.navIconName, size, color));
      }
      if (props.overflowIconName) {
        allPromises.push(getImageSource(props.overflowIconName, size, color));
      }

      Promise.all([...allPromises])
        .then((allIcons) => {
          let newState = {ready: true};

          newState.actions = props.actions.map((action, index) => {
            return action.iconName ? {icon: allIcons[index], ...action} : action;
          });

          let shift = 0;
          newState.navIcon = props.navIconName && allIcons[props.actions.length + shift++];
          newState.overflowIcon = props.overflowIconName && allIcons[props.actions.length + shift];

          this.setState(newState);
        });
    }

    componentWillReceiveProps(nextProps) {
      const keys = Object.keys(IconToolbarAndroid.propTypes);
      if (!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        this.updateIconSources(nextProps);
      }
    }

    render() {
      // actions are both in props and state, we want the ones from state
      const {actions, ...other} = this.props;
      if (!this.state.ready) {
        return <ToolbarAndroid {...other} />;
      }
      return <ToolbarAndroid {...other} {...this.state} />;
    }
  };
}
