import {
  Body, Controller, DefaultValuePipe, Delete, Get, Header,
  // HttpException,
  // HttpCode,
  HttpStatus, Param, ParseBoolPipe, ParseIntPipe, ParseUUIDPipe,
  Patch, Post, Query, Redirect, Req, Res, UseFilters, UseGuards,
  UseInterceptors,
  // UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
// import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CustomForbiddenException } from '../exceptions/forbidden.exception';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { User } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
// import { createCatSchema } from './cats.schema';

interface FindOneV2 {
  id: number;
}

// leaving responsibility for instantiation to the framework and enabling dependency injection.
@UseGuards(RolesGuard)
// As with pipes and exception filters, we can also pass an in-place instance
// @UseGuards(new RolesGuard())
// Responsibility for instantiation to the framework and enabling dependency injection.
@UseInterceptors(LoggingInterceptor)
// As with pipes, guards, and exception filters, we can also pass an in-place instance:
// @UseInterceptors(new LoggingInterceptor())
@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  private readonly catsService: CatsService;

  constructor(catsService: CatsService) {
    this.catsService = catsService;
  }

  @Post()
  // @HttpCode(204)
  @Header('Cache-Control', 'none')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  create(
    @Res() response: Response,
    // @Body() createCatDto: CreateCatDto,
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): string {
    response.status(HttpStatus.CREATED).send();
    return this.catsService.create(createCatDto);
  }

  // http://localhost:3000/cats/ab_cd
  @Get('ab*cd')
  // @Get()
  async findAll(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<Cat[]> {
    console.log({ request });
    response.status(HttpStatus.OK);
    return this.catsService.findAll();
  }

  // http://localhost.com:3000/cats/find-all-v2?activeOnly=true&page=123
  @Get('find-all-v2')
  async findAllV2(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll({ activeOnly, page });
  }

  // http://localhost:3000/cats/find-all-v3
  @Get('find-all-v3')
  @Roles('admin')
  async findAllV3(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<Cat[]> {
    console.log({ request });
    response.status(HttpStatus.OK);
    return this.catsService.findAll();
  }

  // http://localhost:3000/cats/find-all-v4
  @Get('find-all-v4')
  @Auth('admin')
  async findAllV4(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('async')
  async findAllAsync(): Promise<Cat[]> {
    return this.catsService.findAllAsync();
  }

  @Get('observable')
  findAllObserveable(): Observable<Cat[]> {
    return this.catsService.findAllObservable();
  }

  @Get('exception-filters')
  // @UseFilters(new HttpExceptionFilter())
  // you may pass the class (instead of an instance),
  // leaving responsibility for instantiation to the framework, and enabling dependency injection.
  @UseFilters(HttpExceptionFilter)
  async findAllExceptionFilters(): Promise<Cat[]> {
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, HttpStatus.FORBIDDEN);
    throw new CustomForbiddenException();
  }

  // localhost:3000/cats/docs?version=5
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version): object {
    let output;
    if (version && version === '5') {
      output = { url: 'https://docs.nestjs.com/v5/' };
    }
    return output;
  }

  // @Get('idv6')
  // async findOneV6(
  //   @User(new ValidationPipe({ validateCustomDecorators: true })) user: UserEntity,
  // ): Promise<void> {
  //   console.log(user);
  // }

  @Get('idv5')
  // async findOne(@User() user: UserEntity) {
  async findOneV5(@User('firstName') firstName: string): Promise<void> {
    console.log(`Hello ${firstName}`);
  }

  // http://localhost:3000/cats/idv4/123
  @Get('idv4/:id')
  async findOneV4(@Param('id', new ParseIntPipe()) id): Promise<string> {
    return this.catsService.findOne(id);
  }

  // http://localhost.com:3000/cats/idv3?id=123
  @Get('idv3')
  findOneV3(
    @Query('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
  ): string {
    return this.catsService.findOne(id);
  }

  // http://localhost:3000/cats/idv2/123
  @Get('idv2/:id')
  findOneV2(@Param() params: FindOneV2): string {
    console.log(params?.id);
    return this.catsService.findOne(params?.id);
  }

  // http://admin.localhost.com:3000/cats/abc
  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
  ): string {
    return this.catsService.findOne(id);
  }

  // http://localhost.com:3000/cats/uuid/3b059a15-f2c2-4d6d-b988-66c9054d6852
  @Get('uuid/:uuid')
  async findOneUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    console.log({ uuid });
    return this.catsService.findOne(123);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.catsService.remove(+id);
  }
}
