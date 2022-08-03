import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password }: Request): User {
    const findExistingUser = this.usersRepository.find({ name, email });

    if (findExistingUser) {
      throw Error('Name or email already used.');
    }

    const user = this.usersRepository.create({ name, email, password });

    return user;
  }
}

export default CreateUserService;
