export interface PrompField {
  type: string;
  placeholder: string;
  required: boolean;
  value: any;
}

export interface PrompOptions {
  title?: string;
  message?: string;
  okTitle?: string;
  noTitle?: string;
  fields: PrompField[];
}
