import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Gksdnf123@@',
  database: 'nestjs',
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
};
