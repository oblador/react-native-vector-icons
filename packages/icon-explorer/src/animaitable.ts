import { createAnimatableComponent as createAnimatableComponentRNA } from 'react-native-animatable';
import { isDetoxSync } from 'react-native-is-detox';

import type React from 'react';

const createAnimatableComponentMock = (component: React.FC) => component;

export const createAnimatableComponent = isDetoxSync() ? createAnimatableComponentMock : createAnimatableComponentRNA;
