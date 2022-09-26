# Nest Qualifier

### How it works
Add alias metadata to the class and use it as token injection.

### How to install
```shell
# npm
npm i --save @nattogo/nest-qualifier

#yarn
yarn add @nattogo/nest-qualifier
```
### How to use
####
IRepository.ts
```ts
export interface IRepository {
    findOne: (id: string) => Promise<any>;
}
```

MongoRepository.ts
```ts

import {Injectable} from "@nattogo/nest-qualifier";

@Injectable({
    alias: 'MongoRepository'
})
export class MongoRepositoryImlp implements IRepository {
    findOne(id: string): Promise<{ id: string }> {
        return Promise.resolve({
            id
        });
    }

}
```

MySQLRepository.ts
```ts

import {Injectable} from "@nattogo/nest-qualifier";

@Injectable({
    alias: 'MySQLRepository'
})
export class MySQLRepositoryImpl implements IRepository {
    findOne(id: string): Promise<{ id: string }> {
        return Promise.resolve({
            id
        });
    }

}
```
ProductService.ts
```ts
import {Injectable} from "@nestjs/common";
import {Qualifier} from "@nattogo/nest-qualifier";

@Injectable()
export class ProductService {
    public constructor(
        @Qualifier('MongoRepository') mongoRepository: IRepository,
        @Qualifier('MySQLRepository') mysqlRepository: IRepository
    ) {}
}
```

ProductModule.ts
```ts
import {Module} from "@nattogo/nest-qualifier";

@Module({
    providers: [
        MongoRepository,
        MySQLRepository,
    ],
})
export class ProductModule {
}
```

### License
MIT License