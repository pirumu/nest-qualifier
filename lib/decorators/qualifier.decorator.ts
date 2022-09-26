import { Inject, InjectionToken } from '@nestjs/common';

export function Qualifier(
  alias?: InjectionToken
): (target: object, key: string | symbol, index?: number) => void {
  return Inject(alias);
}
