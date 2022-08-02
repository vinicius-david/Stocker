import User from '../models/User';

interface createDTO {
  name: string;
  email: string;
  password: string;
}

interface findDTO {
  id?: string;
  name?: string;
  email?: string;
}

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public list(): User[] {
    return this.users;
  }

  public create({ name, email, password }: createDTO): User {
    const user = new User({ name, email, password });

    this.users.push(user);

    return user;
  }

  public find({ id, name, email }: findDTO): User | undefined {
    const result = this.users.find(u => u.id === id || u.name === name || u.email === email);

    return result;
  }
}

export default UserRepository;
