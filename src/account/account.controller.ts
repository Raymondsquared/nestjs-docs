import {
  Body, Controller, Delete, Get, HostParam, Param, Patch, Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller({ host: ':account.localhost.com' })
export class AccountController {
  private readonly accountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  // http://random-account.localhost.com:3000/my-account
  @Get('my-account')
  getInfo(@HostParam('account') account: string) {
    return account;
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
