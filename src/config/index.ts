export const  config = {
   dbUri: process.env.DB_URI || 'mongodb://chitolpitha:password@db:27017/chitolpitha',
   redisUrl: process.env.DB_URI || 'redis://localhost:6379',
}

process.env.NODE_ENV === 'development' && console.log(config);
