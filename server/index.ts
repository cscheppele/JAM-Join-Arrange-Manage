import app from './app';
// import sequelize from './models/modelDB'

(async () => {
  try {
    const port = process.env.SERVER_PORT || 3333;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Not connected to server:', error);
  }
})();