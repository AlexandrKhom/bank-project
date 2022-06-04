import typeOrmConfig from './type-orm.config';

const seedormconfig = {
  ...typeOrmConfig,
  cli: {
    migrationsDir: 'src/seeds',
  },
  migrations: [__dirname + '/../seeds/**/*{.ts,.js}'],
};
export default seedormconfig;
