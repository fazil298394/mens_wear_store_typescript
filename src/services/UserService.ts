import { User } from "../models/User";
import { AppError, throwCriticalError } from "../models/Errors";

export type UserRegistration = Omit<User, "createdAt">;

export class UserService {
  private users: User[] = [];

  register(user: UserRegistration) {
    if (!user.id || !user.email) throwCriticalError("Invalid user");
    const newUser: User = {
      ...user,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getProperty<T extends keyof User>(id: string, key: T) {
    const u = this.getById(id);
    if (!u) throwCriticalError("User not found");
    return u[key];
  }

  seed(users: User[]) {
    this.users = users;
  }
}
