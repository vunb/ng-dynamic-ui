export interface IDynamicDataComponent {
  data: any;
  options ?: any;
  cmpInstance ?: any;
  addSheet ?: any;
  onSave(data ?: any);
}

export interface IDynamicToHanhChinh {
  header: any;
  hanhchinh: any;
  qlnb: any;
  chandoan: any;
  tinhtrangravien: any;
  footer: any;
  khambenh: any;
}

/**
 * Thông tin tờ hồ sơ để cho phép hiển thị trên hoso-viewer
 */
export interface IHoSoInfoComponent {
  title: string;
  icon: string;
  formType: string; // Mã loại hồ sơ
  idType?: string;   // Id loại hồ sơ
  idData?: string;   // Id data hồ sơ
  order: number;
  number: number;
  layout: string;
  meta?: any;
}

export type fFunction = (...args) => void;

export interface IDynamicComponentOptions extends IHoSoInfoComponent {
  [key: string]: any;
  fBeforePrint: fFunction | boolean;
}
