import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEntity } from "../categoria/categoria.entity";

@Entity({ name: 'producto' })
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    prod_id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    prod_nombre: string;

    @Column({ type: 'float', nullable: false })
    prod_precio: number;

    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.cat_id)
    categoria: CategoriaEntity;
}