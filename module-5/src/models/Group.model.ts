import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.model";

@Entity()
class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('simple-array')
    permissions: Array<Permission>;

    @ManyToMany(() => User)
    users: Array<User>;
}

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export default Group;
