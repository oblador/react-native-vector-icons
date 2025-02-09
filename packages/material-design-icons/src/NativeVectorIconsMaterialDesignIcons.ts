import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Spec extends TurboModule {}

export default TurboModuleRegistry.get<Spec>('VectorIconsLucide') || {};
