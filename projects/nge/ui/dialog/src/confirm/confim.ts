export interface ConfirmOptions {
  title?: string;
  message?: string;
  okTitle?: string;
  noTitle?: string;
  buttons?: {
    id: string;
    title: string;
    role: 'ok' | 'cancel' | 'custom';
  }[];
}
