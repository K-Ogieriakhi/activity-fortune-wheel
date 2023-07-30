export interface Activities {
  text: string;
  tickets: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
  probability?: number;
}
