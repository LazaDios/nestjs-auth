import { Column,
        CreateDateColumn,
        Entity,
        PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')  //Genera una ID unica para cada usuario
    id:string;

    @Column({length:20})  //Guarda el nombre del usuario
    name:string;

    @Column({length:100, unique:true})  //Guarda el email del usuario
    email:string;

    @Column({length:100})  //Guarda el email del usuario
    password:string;

    @Column({type:'boolean', default:false})  //Guarda si el usuario esta activo o no. Por defecto es false. 0:No activo, 1:Activo. 1 es true, 0 es false. 1 es true, 0 es false. 1 es true, 0 es false. 1 es true, 0 es false. 1 es true, 0 es false. 1 es true, 0 es false.
    activate:boolean;

    @CreateDateColumn()
    createdOn:Date;

}