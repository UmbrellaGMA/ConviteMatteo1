
export interface GuestInfo {
  name: string;
  confirmed: boolean;
  message?: string;
  title?: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  mapUrl: string;
}

export enum InvitationState {
  IDLE,
  OPENING,
  OPENED,
  RSVP_SUBMITTED
}
