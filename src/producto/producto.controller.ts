import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoEntity } from 'src/entities/producto/producto.entity';
import { MessageDto } from 'src/common/message.dto';

@Controller('producto')
export class ProductoController {
    constructor(
        private readonly _productoService: ProductoService,
    ) {}

    @Post()
    async crearProducto(@Body() producto: any){
        return await this._productoService.crearProducto(producto);
    }
    @Get()
    async obtenerProductos(){
        return await this._productoService.obtenerProductos();
    }
    @Get(':id')
    async obtenerProducto( @Param('id', ParseIntPipe) id: number): Promise<ProductoEntity> {
        return await this._productoService.obtenerProducto(id);
    }
    @Delete(':id')
    async eliminarProducto(@Param('id', ParseIntPipe) id: number){
        return await this._productoService.eliminarProducto(id);
    }
    @Put(':id')
    async actualizarProducto(
        @Param('id', ParseIntPipe) id: number,
        @Body() datosActualizados: Partial<ProductoEntity>,
    ): Promise<MessageDto> {
        return await this._productoService.actualizarProducto(id, datosActualizados);
    }
}
