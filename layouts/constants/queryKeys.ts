import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
  users: {
    userUid: (uid: string) => uid,
  },
  studyMeetings: null,
});
