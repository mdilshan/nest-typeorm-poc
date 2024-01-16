import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/auth.guard';
import { AddShoppingPreferenceDto } from './dto/add-shopping-preference.dto';
import { MeResponse } from './dto/me-response.dto';
import { ExceptionResponseDto } from 'src/common/dto/exception-response.dto';

type RequestWithUser = Request & { user?: any };

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile', description: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Get user profile', type: MeResponse })
  @ApiResponse({ status: 403, description: 'Unauthorized', type: ExceptionResponseDto })
  async me(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.usersService.findOne(userId);
    return user;
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new user', description: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('verify/:token')
  @ApiOperation({ summary: 'Verify user email', description: 'Verify user email. This should usually send to the email' })
  async verify(@Param('token') token: string) {
    return this.usersService.verify(token);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('add/shopping-preferences')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async addShoppingPreferences(@Req() req: RequestWithUser, @Body() body: AddShoppingPreferenceDto) {
    return this.usersService.addShoppingPreferences(req.user.id, body.preferencesIds);
  }
}
