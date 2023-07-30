export interface Ticket {
  text: string;
  probability: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
  position: number; // unique
  ticketsInDrum: number;
}
