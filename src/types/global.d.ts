interface Window {
  gtag: (
    command: string,
    action: string,
    params: {
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ) => void;
} 

interface ImportMetaEnv {
  readonly VITE_SMARTLAUNCH_URL?: string;
  readonly VITE_PDF_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}