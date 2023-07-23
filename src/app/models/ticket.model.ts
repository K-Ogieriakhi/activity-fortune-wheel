export interface Ticket {
  text: string;
  propability: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
  id: number;
}
