export const ENV_VAR = {
  appPort:process.env.PORT || '7000',
  jwt:{
    jwtSecret:process.env.JWT_SECRET_KEY,
    jwtExpireTime:process.env.JWT_LOGIN_TOKEN_TIME
  },
  mongoDb:{
    url:process.env.MONGO_DB_URL
  },
  host:process.env.front || `localhost:${process.env.PORT || '7000'}`
}

export const config = () => ENV_VAR;