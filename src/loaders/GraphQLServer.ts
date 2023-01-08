import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PetsModule } from '@modules/pets/pets.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

@Module({
    imports: [
        GraphQLModule.forRoot<MercuriusDriverConfig>({
            driver: MercuriusDriver,
            graphiql: true || process.env.NODE_ENV != 'production',
            autoSchemaFile: 'src/schema.gql',
        }),
        PetsModule
    ]
})
export class LoadGraphQLServer { }
