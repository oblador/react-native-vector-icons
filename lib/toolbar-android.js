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

    updateIconSources(props) {
      const size = props.iconSize;
      const color = props.iconColor || props.titleColor;

      let iconsPromises = []
      if (props.navIconName) {
        iconsPromises.push(getImageSource(props.navIconName, size, color))
      }
      if (props.overflowIconName) {
        iconsPromises.push(getImageSource(props.overflowIconName, size, color))
      }

      let actionsPromises = props.actions.map(action => {
        if (action.iconName) {
          return getImageSource(action.iconName, action.iconSize || size, action.iconColor || color)
        } else {
          return Promise.resolve(action);
        }
      })

      Promise.all([...actionsPromises, ...iconsPromises])
        .then((iconsAndActionIcons) => {
          let newState = {ready: true}

          newState.actions = props.actions.map((action, index) => {
            if (action.iconName) {
              return {icon: iconsAndActionIcons[index], ...action}
            }
            return action
          })

          let shift = 0
          if (props.navIconName) {
            newState.navIcon = iconsAndActionIcons[props.actions.length + shift++];
          }
          if (props.overflowIconName) {
            newState.overflowIcon = iconsAndActionIcons[props.actions.length + shift++];
          }

          this.setState(newState)
        });
    }

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

    componentWillReceiveProps(nextProps) {
      const keys = Object.keys(IconToolbarAndroid.propTypes);
      if (!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        // let stateToEvict = {};
        // if (!nextProps.navIconName) {
        //   stateToEvict.navIcon = undefined;
        // }
        // if (!nextProps.overflowIconName) {
        //   stateToEvict.overflowIcon = undefined;
        // }
        // if (this.state && Object.keys(stateToEvict).length) {
        //   this.setState(stateToEvict, () => this.updateIconSources(nextProps));
        // } else {
        this.updateIconSources(nextProps);
        // }
      }
    }

    render() {
      // actions are both in props and state, we want the ones from state
      const {actions, ...other} = this.props
      if (!this.state.ready) {
        return <ToolbarAndroid {...other} />;
      }
      return <ToolbarAndroid {...other} {...this.state} />;
    }
  };
}
