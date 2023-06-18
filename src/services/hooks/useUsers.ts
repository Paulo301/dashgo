import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: User) => {
    const { createdAt, ...rest } = user;

    return {
      createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      ...rest
    };
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //min
    initialData: options.initialData
  }) as UseQueryResult<GetUsersResponse, unknown>;
}