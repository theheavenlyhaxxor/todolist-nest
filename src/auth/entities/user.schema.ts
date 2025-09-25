export class UserEntity {
  id: number;
  username: string;
  password: string;
  refreshToken: string;
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
