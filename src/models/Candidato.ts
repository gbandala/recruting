import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { EstadoCandidatoEnum } from '../enums';
import { CandidatoDTO } from '../dtos/CandidatoDTO';

@Table({
  tableName: 'candidatos',
  timestamps: true
})
export class Candidato extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at'
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at'
  })
  updated_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nombre'
  })
  nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'segundo_nombre'
  })
  segundo_nombre?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'apellido_paterno'
  })
  apellido_paterno: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'apellido_materno'
  })
  apellido_materno?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email'
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'telefono'
  })
  telefono: number;

  @Column({
    type: DataType.ENUM(...Object.values(EstadoCandidatoEnum)),
    allowNull: false,
    field: 'estado'
  })
  estado: EstadoCandidatoEnum;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'fecha'
  })
  fecha?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'hora'
  })
  hora?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'llamar_ahora'
  })
  llamar_ahora: boolean;

  toDTO(): CandidatoDTO {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      nombre: this.nombre,
      segundo_nombre: this.segundo_nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      email: this.email,
      telefono: this.telefono,
      estado: this.estado,
      fecha: this.fecha,
      hora: this.hora,
      llamar_ahora: this.llamar_ahora
    };
  }

}