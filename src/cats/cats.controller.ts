import {
  Body, Controller, Delete, Get, Header,
  // HttpCode,
  HttpStatus, Param, Patch, Post, Query, Redirect, Req, Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

interface FindOneV2 {
  id: number;
}

@Controller('cats')
export class CatsController {
  private readonly catsService: CatsService;

  constructor(catsService: CatsService) {
    this.catsService = catsService;
  }

  @Post()
  // @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Res() response: Response, @Body() createCatDto: CreateCatDto): string {
    response.status(HttpStatus.CREATED).send();
    return this.catsService.create(createCatDto);
  }

  // http://localhost:3000/cats/ab_cd
  @Get('ab*cd')
  @Get()
  async findAll(
      @Res({ passthrough: true }) response: Response,
      @Req() request: Request,
  ): Promise<string> {
    console.log({ request });
    response.status(HttpStatus.OK);
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

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.catsService.findOne(+id);
  }

  // http://localhost:3000/cats/idv2/123
  @Get('idv2/:id')
  findOneV2(@Param() params: FindOneV2): string {
    console.log(params?.id);
    return this.catsService.findOne(params?.id);
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
