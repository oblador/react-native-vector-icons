import { createAnimatableComponent as createAnimatableComponentRNA } from 'react-native-animatable';

import type React from 'react';
import { ScrollView } from 'react-native';

const createAnimatableComponentMock = (component: React.FC) => component;

const disableAnimations = () => {
  const scroll = <ScrollView showsVerticalScrollIndicator />;

  return !scroll.props.showsVerticalScrollIndicator;
};

export const createAnimatableComponent = disableAnimations()
  ? createAnimatableComponentMock
  : createAnimatableComponentRNA;
