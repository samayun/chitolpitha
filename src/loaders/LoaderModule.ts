
import { join } from 'path';
import { sync as globSync } from 'fast-glob';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class LoaderModule {
  static forRoot(): DynamicModule {
    const modules = [];
    // Load all the modules in the './modules' directory
    const moduleNames = globSync(join(__dirname, '../modules/**/*.module.js'));
    for (const moduleName of moduleNames) {
      modules.push((require(moduleName)?.default));
      // modules.push((await import(moduleName)).default);
    }

    return {
      module: LoaderModule,
      imports : modules,
    };
  }
}
