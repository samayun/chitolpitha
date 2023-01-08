import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

@Module({
    imports: [
        GraphQLModule.forRoot<MercuriusDriverConfig>({
            driver: MercuriusDriver,
            graphiql: true || process.env.NODE_ENV != 'production',
            autoSchemaFile: 'src/schema.gql',
        })
    ]
})
export class LoadGraphQLServer { }
