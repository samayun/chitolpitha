import { join } from 'path';
import { sync as globSync } from 'fast-glob';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export default class LoaderModule {
  static forRoot(): DynamicModule {
    const modules = [];

    // Load all the modules in the './modules' directory
    const moduleNames = globSync(join(__dirname, '/**/*.module.js'));

    for (const moduleName of moduleNames) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      modules.push(require(moduleName)?.default);
    }

    return { module: LoaderModule, imports: modules };
  }
}
