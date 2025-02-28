import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { ProductoEntity } from 'src/entities/producto/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
constructor(
    @InjectRepository(ProductoEntity)
    private readonly _productoRepository: Repository<ProductoEntity>,
) {}
    async crearProducto(producto: ProductoEntity): Promise<MessageDto> {
        const nuevoProducto = this._productoRepository.create(producto);
        await this._productoRepository.save(nuevoProducto);
        return new MessageDto ('Producto creado correctamente');
    }
    async obtenerProductos(): Promise<ProductoEntity[]> {
        return await this._productoRepository.createQueryBuilder('producto')
        .select(['producto.prod_nombre', 'producto.prod_precio'])
        .getMany();
    }
    async obtenerProducto(id: number): Promise<ProductoEntity> {
        const producto = await this._productoRepository.findOne({where: {prod_id: id}});
        if(!producto) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }

        return producto;
    }
    async eliminarProducto(id: number): Promise<MessageDto> {
        const producto = await this._productoRepository.findOne({where: {prod_id: id}});
        if(!producto) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }
        await this._productoRepository.delete(id);
        return new MessageDto('Producto eliminado correctamente');
    }
    async actualizarProducto(id: number, datosActualizados: Partial<ProductoEntity>): Promise<MessageDto> {
        const producto = await this._productoRepository.findOne({ where: { prod_id: id } });
    
        if (!producto) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }
    
        await this._productoRepository.update(id, datosActualizados);
        return new MessageDto('Producto actualizado correctamente');
    }    
}
