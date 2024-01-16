import { Controller, Get } from '@nestjs/common';
import { ShoppingPreferencesService } from './shopping-preferences.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShoppingPreference } from './entities/shopping-preference.entity';

@ApiTags('Shopping Preferences')
@Controller('shopping-preferences')
export class ShoppingPreferencesController {
  constructor(private readonly shoppingPreferencesService: ShoppingPreferencesService) { }

  // NOTE: a simple endpoint to seed the shopping preferences table with some data for the demo.
  // Should handle with separate seed script in real application.
  @ApiOperation({ summary: 'Populate shopping preferences table with some data for the demo', description: 'This is for the demo only' })
  @Get('populate')
  async populate() {
    return await this.shoppingPreferencesService.populate();
  }

  @ApiOperation({ summary: 'Get all shopping preferences', description: 'Get all shopping preferences' })
  @ApiResponse({ status: 200, description: 'Get all shopping preferences' })
  @Get()
  async findAll() {
    return await this.shoppingPreferencesService.findAll();
  }
}
