import { useMemo, useEffect, useRef, useState } from 'react';

/** @todo Rejected 상태 추가 */
type Status = 'pending' | 'resolved';

/** @todo error 프로퍼티 추가 */
type Pending<Data> = {
  status: 'pending';
  data?: Data;
};

/** @todo error 프로퍼티 추가 */
type Resolved<Data> = {
  status: 'resolved';
  data: Data;
};

type Result<T> = Pending<T> | Resolved<T>;

export default function useQuery<
  Fetcher extends (...args: any[]) => any,
  Args extends Parameters<Fetcher>,
  Data extends Awaited<ReturnType<Fetcher>>
>(fetcher: Fetcher, args: Args): Result<Data> {
  const initializedRef = useRef<boolean>(false);
  const responseRef = useRef<Data | Promise<Data>>();

  // 비동기 함수가 아닌 경우 초기 상태를 resolved로 설정
  const initialResult = useMemo<Result<Data>>(() => {
    const response = fetcher(...args);
    responseRef.current = response;
    if (response instanceof Promise) {
      return { status: 'pending', data: undefined };
    }
    return { status: 'resolved', data: response };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [status, setStatus] = useState<Status>(initialResult.status);
  const [data, setData] = useState<Data | undefined>(initialResult.data);

  useEffect(() => {
    // 초기화(첫 렌더링) 시에는 initialResult에서 이미 fetcher를 호출했기 때문에, 초기화 이후에만 fetcher를 호출
    if (initializedRef.current) {
      responseRef.current = fetcher(...args);
    }
    initializedRef.current = true;
    (async () => {
      const response = await responseRef.current;
      setData(response);
      setStatus('resolved');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, ...args]);

  return { status, data } as Result<Data>;
}
