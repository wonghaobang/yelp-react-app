const { Pool } = require("pg")

// const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
// const proConfig = process.env.DATABASE_URL

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// })

const devConfig2 = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}
const proConfig2 = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig2 : devConfig2
)

module.exports = {
  query: (text, params) => pool.query(text, params),
}
