import { UserRepository } from "@/domain/repositories/users";

export class LoadUserByTaxIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ tax_id }: { tax_id: string }) {
    const user = await this.userRepository.findUser({ tax_id });

    if (!user) {
      return new Error("User not found");
    }

    return user;
  }
}
