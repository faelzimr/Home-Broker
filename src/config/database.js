module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'homeBroker',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
