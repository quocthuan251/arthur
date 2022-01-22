require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./src/routes/auth');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@arthur.termy.mongodb.net/arthur?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log(`***MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
