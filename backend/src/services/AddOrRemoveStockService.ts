import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  stockId: string;
}

class AddOrRemoveStockService {
  public async execute({ id, stockId }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    // TODO: find stock object to verify id;

    const stockIndex = user.stocks.findIndex(stock => stock === stockId);

    if (stockIndex > -1) {
      user.stocks.splice(stockIndex, 1);
    } else {
      user.stocks.push(stockId);
    }

    return user;
  }
}

export default AddOrRemoveStockService;
