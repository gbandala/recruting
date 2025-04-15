import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'llamadas',
  timestamps: true
})
export class Llamada extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  update_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  entrevistador: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nivel: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  promocion: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  resumen: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  conocimiento: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  telefono: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  personalidad: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  transcripcion: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  termino: boolean;

  toDTO() {
    return {
      id: this.id,
      created_at: this.created_at,
      update_at: this.update_at,
      nombre: this.nombre,
      entrevistador: this.entrevistador,
      nivel: this.nivel,
      promocion: this.promocion,
      resumen: this.resumen,
      conocimiento: this.conocimiento,
      telefono: this.telefono,
      personalidad: this.personalidad,
      transcripcion: this.transcripcion,
      termino: this.termino
    };
  }

}