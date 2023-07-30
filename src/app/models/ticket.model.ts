export interface Ticket {
  text: string;
  propability: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
  position: number; // unique
  ticketsInDrum: number;
}
