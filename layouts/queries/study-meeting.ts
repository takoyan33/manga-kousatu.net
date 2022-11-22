import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants";
import { studyMeetingRepository } from "src/modules/study-meeting";

export const useGetAllStudyMeetings = () => {
  return useQuery(queryKeys.studyMeetings._def, studyMeetingRepository.find);
};

export const useGetOneStudyMeeting = (title: string) => {
  return useQuery(queryKeys.studyMeetings._def, () => studyMeetingRepository.findOne(title));
};
