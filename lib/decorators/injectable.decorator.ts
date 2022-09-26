import { ALIAS_TOKEN } from '../constants';
import * as common from '@nestjs/common/decorators/core';
import {InjectableOptions} from "@nestjs/common";

export type Options = { alias?: string } & InjectableOptions;


function alias(alias?: string): ClassDecorator {
  return function (target: object): void {
    const token = alias || target;
    Reflect.defineMetadata(ALIAS_TOKEN, token, target);
  };
}
export function Injectable(opts?: Options): ClassDecorator {
  return common.applyDecorators(
    alias(opts?.alias),
    common.Injectable({
      scope: opts?.scope,
    })
  );
}
