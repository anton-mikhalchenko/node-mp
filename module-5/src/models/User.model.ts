import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Group from "./Group.model";

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

    @ManyToMany(() => Group)
    @JoinTable({
        name: 'user_group',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'group_id',
            referencedColumnName: 'id'
        }
    })
    groups: Array<Group>;
}

export default User;
