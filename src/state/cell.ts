export type CellTypes = 'code' | 'text';
export interface Cell {
  id: string;
  variant: 'code' | 'text';
  content: string;
}
