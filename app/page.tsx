import { clientApi } from '@/src/lib/api/client';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function Home() {
  const data = await clientApi.get<Todo[]>('/todos');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        {data?.map(item => (
          <div key={item.id}>{item.title}</div>
        ))}
      </main>
    </div>
  );
}
