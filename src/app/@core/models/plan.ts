export type Plan = {
  _id: string;
  nombre: string;
  descripcion: string;
  tipo_plan_id: string;
  aplicativo_id: string;
  activo: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  __v: number;
  vigencia?: string;
};
