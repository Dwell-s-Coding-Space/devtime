import { createMyPageApi } from '@/src/features/mypage/mypage.api';

import { createServerApi } from '@/src/lib/api/server';

export default async function Home() {
  const serverApi = await createServerApi();
  const data = await createMyPageApi(serverApi).getProfile();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p>NAME : {data.nickname}</p>
      <p>EMAIL : {data.email}</p>
    </div>
  );
}
