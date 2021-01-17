const PORT = process.env.PORT || 3000;
const mongoUri = 'mongodb+srv://user:qwert12345@cluster0.prqep.mongodb.net/announcement';
const mongoConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };

module.exports = {
  PORT,
  mongoUri,
  mongoConnectOptions
}