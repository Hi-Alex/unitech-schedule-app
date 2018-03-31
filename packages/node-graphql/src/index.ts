import { app } from "./app";

app.listen(3050, (error?: Error) => {
  if (error) {
    console.log('Server listening error');
    console.error(error);
    process.exit(1);
  }
  console.log('Server is running');
});
