const io = require("socket.io")(3001, {
  cors: {
    origin: "https://music-nine-sand.vercel.app",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("first", { data: null });
  socket.on("song", (song) => {
    io.emit("message", song);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
