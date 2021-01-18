export const ENV_VAR = {
  appPort:process.env.PORT || '7890',
  jwt:{
    jwtSecret:process.env.JWT_SECRET_KEY,
    jwtExpireTime:process.env.JWT_LOGIN_TOKEN_TIME
  },
  mongoDb:{
    url:process.env.MONGO_DB_URL
  },
  host:process.env.front || `http://localhost:${process.env.PORT || '7890'}`
}

export const config = () => ENV_VAR;