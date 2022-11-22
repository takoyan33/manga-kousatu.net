import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { User, userRepository } from "../user";

export const useGetAllUsers = () => {
  return useQuery(queryKeys.users._def, userRepository.find);
};

export const useGetOneUser = (uid: string) => {
  return useQuery(queryKeys.users.userUid(uid), () =>
    userRepository.findOne(uid)
  );
};

export const useUpdateUser = (
  userId: string,
  newData: Partial<User>,
  queryOptions?: UseMutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation(() => userRepository.update(userId, newData), {
    ...queryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.users._def);
    },
  });
};

export const useDeconsteUser = (
  userId: string,
  queryOptions?: UseMutationOptions
) => {
  const queryClient = useQueryClient();
  return useMutation(() => userRepository.deconste(userId), {
    ...queryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.users._def);
    },
  });
};
