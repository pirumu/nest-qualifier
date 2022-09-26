import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  Provider,
  ValueProvider,
} from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

export class ModuleUtil {
  public static isCustomProvider(
    provider: Provider
  ): provider is ClassProvider | FactoryProvider | ValueProvider | ExistingProvider {
    return !isNil(
      (provider as ClassProvider | FactoryProvider | ValueProvider | ExistingProvider).provide
    );
  }
}
