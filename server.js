const express = require('express'),
	app = express(),
	port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening at port ${port}`));
