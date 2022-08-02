import { getSession } from 'next-auth/react';
import Order from '../../../models/Orders';
import db from '../../../utils/db';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'Login required' });
    }
    const { user } = session;
    await db.connect();
    const orders = await Order.find({ user: user._id }, { __v: 0 });
    if (!orders) {
        await db.disconnect();
        return res.send(orders);
    }
    await db.disconnect();
    return res.status(200).send(orders);
};

export default handler;
