export const MimeKinds = [
  'application',
  'audio',
  'font',
  'image',
  'text',
  'video',
] as const;
export type MimeKind = (typeof MimeKinds)[number];
export type MimeTypesResponse = Record<MimeKind, string[]>;
