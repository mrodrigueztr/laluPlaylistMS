const connectDB = require("../db/lalu_playlist_db");
const app = require("../laluPlaylist");

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://mrodrigueztr:prueba@api-rest.ty8tf.mongodb.net/laluPlaylistsDb?retryWrites=true&w=majority"
    );
    app.listen(port, () => console.log(`Server is listening on port ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
