export interface Book {
  isbn: string;
  name: string;
  author: string;
  publication: string;
  details: string;
  qty: number;
  price?: number;
  branch: 'IT' | 'Civil' | 'Mechanical';
}
