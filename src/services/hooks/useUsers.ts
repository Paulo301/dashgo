import { useQuery } from "react-query";
import { api } from "../api";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUserResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUserResponse> {
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

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10 //min
  });
}