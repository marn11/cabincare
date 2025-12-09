import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CabinDto } from './dto/newcabin.dto';
@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}
  @Post()
  create(@Body() CabinDto: CabinDto) {
    return this.cabinsService.newCabin(
      CabinDto.name,
      CabinDto.location,
      CabinDto.image,
    );
  }
  @Get()
  findAll() {
    return this.cabinsService.getAllCabins();
  }
  //   @Put()
}
