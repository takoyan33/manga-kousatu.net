export type User = {
  active: boolean | undefined;
  bio: string;
  createdAt: Date;
  displayName: string | undefined;
  email: string | undefined;
  faculty: string | null;
  field: string | null;
  fieldDetails: Array<string> | undefined;
  github: string | undefined;
  grade: string | null;
  instagram: string | undefined;
  photoURL: string;
  position: number;
  status: number;
  twitter: string | undefined;
  uid: string;
  university: string;
};
