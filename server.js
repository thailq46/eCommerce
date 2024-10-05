const app = require("./src/app");

const PORT = 3055;

const server = app.listen(PORT, () => {
   console.log(`WSV eCommerce start on port ${PORT}`);
});

// Khi nhấn Ctrl + C để dừng server và log ra thông báo
process.on("SIGINT", () => {
   server.close(() => {
      console.log("WSV eCommerce stopped");
   });
});
