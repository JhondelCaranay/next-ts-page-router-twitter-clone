import fetcher from "@/libs/swr/fetcher";
import { User } from "@prisma/client";
import { AxiosError } from "axios";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User, AxiosError>(
    "/api/current",
    fetcher, {
      
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
