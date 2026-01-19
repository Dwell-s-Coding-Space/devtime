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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        {data?.map(item => (
          <div key={item.id}>
            <div className="heading-s">{item.title}</div>
            <div className="heading-r">{item.title}</div>
            <div className="heading-m">{item.title}</div>
            <div className="heading-b">{item.title}</div>
            <div className="label-s">{item.title}</div>
          </div>
        ))}
      </main>
    </div>
  );
}
