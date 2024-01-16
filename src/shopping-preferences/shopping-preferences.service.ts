import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingPreference } from './entities/shopping-preference.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ShoppingPreferencesService {
  constructor(@InjectRepository(ShoppingPreference) private readonly shoppingPrefRepository: Repository<ShoppingPreference>) {}

  // NOTE: a simple endpoint to seed the shopping preferences table with some data for the demo.
  // Does not drop foreign keys so will fail if run after added user preferences.
  // Should handle with separate seed script in real application.
  async populate() {
    await this.shoppingPrefRepository.query('TRUNCATE "shopping_preference" RESTART IDENTITY;');

    const promises = ["furniture", "music", "clothing", "hardware", "jewellery"].map(item => {
      this.shoppingPrefRepository.insert({
        text: item
      });
    })
    await Promise.all(promises);
  }

  async findAll() {
    return await this.shoppingPrefRepository.find();
  }
}
