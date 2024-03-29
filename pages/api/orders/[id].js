import { getSession } from 'next-auth/react';
import Order from '../../../models/Orders';
import db from '../../../utils/db';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'Login required' });
    }
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();
    return res.status(200).send(order);
};

export default handler;
