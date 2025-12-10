import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CabinDto } from './dto/newcabin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() CabinDto: CabinDto,
  ) {
    const image = file ? file.filename : null;
    return this.cabinsService.newCabin(CabinDto.name, CabinDto.location, image);
  }
  @Get()
  findAll() {
    return this.cabinsService.getAllCabins();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.cabinsService.getCabinById(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name?: string; location?: string },
  ) {
    const image = file ? file.filename : null;
    return this.cabinsService.editCabin(id, {
      name: body.name,
      location: body.location,
      image: image,
    });
  }
}
