import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from 'src/common/tokens.service';
import { ShoppingPreference } from 'src/shopping-preferences/entities/shopping-preference.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly userTokenService: TokenService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    let token: string;

    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    })

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    // using a transaction to rollback in case if the send email fails.
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const user = new User(createUserDto);
      await transactionalEntityManager.save(user);

      // send verification email.
      // For the demo, I will just return the token.
      token = this.userTokenService.createVerificationToken(user.email);
    });

    return token;
  }

  async verify(token: string) {
    const decoded = this.userTokenService.decodeVerificationToken(token) as {
      email: string;
      [key: string]: any;
    };

    if (!decoded || !decoded.email) {
      throw new BadRequestException('Invalid token.');
    }

    const user = await this.userRepository.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    user.verified = true;
    await this.entityManager.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }

    const valid = bcrypt.compare(loginUserDto.password, user.password);

    if (!valid) {
      throw new BadRequestException('Invalid credentials.');
    }

    return this.userTokenService.createAccessToken(user);
  }

  async addShoppingPreferences(userId: number, shoppingPreferenceIds: number[]) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (!user.verified) {
      throw new BadRequestException('User should be verified to add shopping preferences.');
    }

    const shoppingPreferences = await this.entityManager.findBy(ShoppingPreference, {
      id: In(shoppingPreferenceIds),
    });

    user.shoppingPreferences = shoppingPreferences;
    await this.entityManager.save(user);
  }

  async findAll() {
    return this.entityManager.find(User);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['shoppingPreferences'],
    })

    return user;
  }
}
