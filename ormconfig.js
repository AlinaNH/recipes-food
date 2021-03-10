module.exports = {
  'type': 'postgres',
  'host': process.env.NODE_ENV === 'production' ? 'postgres' : process.env.HOST,
  'port': 5432,
  'username': 'user',
  'password': '123456',
  'database': 'data',
  'synchronize': true,
  'keepConnectionAlive': false,
  'entities': ['dist/src/components/**/*.entity.js'],
  'migrations': ['dist/src/migrations/*.js'],
  'cli': {
    'migrationsDir': 'src/migrations/',
    'entitiesDir': 'src/components/**/'
  }
};
