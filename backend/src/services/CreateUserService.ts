import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const findExistingUser = await usersRepository.findByNameOrEmail({ name, email });

    if (findExistingUser) {
      throw Error('Name or email already used.');
    }

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
