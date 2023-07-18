export interface Ticket {
  text: string;
  propability: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
  id: number;
}

export interface Activities {
  text: string;
  tickets: number;
  priceLevel: Array<'Low' | 'Medium' | 'High'>;
}
