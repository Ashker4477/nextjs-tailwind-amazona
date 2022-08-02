import { getSession } from 'next-auth/react';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';
import User from '../../../models/UserModel';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(422).json({ message: `${req.method} not supported` });
    }

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'Signin required' });
    }
    const { user } = session;
    const { name, email, password } = req.body;

    if (!name || !email || !email.includes('@') || (password && password.trim().length < 5)) {
        return res.status(422).json({
            message: 'Validation error',
        });
    }

    await db.connect();
    const updateUser = await User.findById(user._id);
    updateUser.name = name;
    updateUser.email = email;
    if (password) {
        updateUser.password = bcryptjs.hashSync(password);
    }

    await updateUser.save();
    await db.disconnect();
    return res.status(200).send({ message: 'User Updated' });
};

export default handler;
