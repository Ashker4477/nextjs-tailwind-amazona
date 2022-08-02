import db from '../../../utils/db';
import bcrypt from 'bcryptjs';
import User from '../../../models/Users';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    const { name, email, password } = req.body;
    if (!name || !email || !email.includes('@') || !password || password.trim().length < 5) {
        return res.status(422).send({ message: 'Validation error' });
    }

    await db.connect();

    const existUser = await User.findOne({ email });
    if (existUser) {
        await db.disconnect();
        return res.status(422).send({ message: 'User already exist' });
    }

    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password),
        isAdmin: false,
    });

    const user = await newUser.save();
    await db.disconnect();
    return res.status(201).send({
        message: 'New user created',
        ...user,
    });
};

export default handler;
