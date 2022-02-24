import { app } from "./app";

const port = process.env.PORT || 8070;

app.listen(port, () => {

    console.log(`App is running at port ${port}.`);

});