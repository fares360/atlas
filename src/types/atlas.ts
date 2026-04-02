export interface SubSection {
  title: string;
  icon: string; // اسم الأيقونة كنص
}

export interface BookMetadata {
  subtitle: string;
  duration: string;
  lessons: number;
  is_available: boolean | string; // قد تأتي كنص أو بوليان
  sub_sections: SubSection[];
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  r2_file_key: string;
  cover_image?: string;
  metadata: BookMetadata;
}