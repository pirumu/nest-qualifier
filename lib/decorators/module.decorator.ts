import { ALIAS_TOKEN } from '../constants';
import { ModuleUtil } from '../ultils/module';
import * as common from '@nestjs/common/decorators';
import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export function Module(metadata: ModuleMetadata): ClassDecorator {
  if (metadata.providers) {
    const removeProviders: Type[] = [];
    const newProviders: Provider[] = [];

    for (const item of metadata.providers) {
      if (!ModuleUtil.isCustomProvider(item)) {
        const alias = Reflect.getMetadata(ALIAS_TOKEN, item);
        if (alias) {
          newProviders.push({
            useClass: item,
            provide: alias,
          });
          removeProviders.push(item);
        }
      }
    }
    metadata.providers = metadata.providers.filter((provider) => {
      return !ModuleUtil.isCustomProvider(provider) && !removeProviders.includes(provider);
    });
    metadata.providers = [...metadata.providers, ...newProviders];
  }

  return common.applyDecorators(common.Module(metadata));
}
