import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    isDeleted: boolean;
}

export default User;
