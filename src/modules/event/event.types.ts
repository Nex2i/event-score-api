export interface Event {
  id: string;
  companyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface CreateEvent extends Event {}
