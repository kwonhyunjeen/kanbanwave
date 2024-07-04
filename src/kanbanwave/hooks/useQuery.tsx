import { useMemo, useEffect, useRef, useState } from 'react';

type Status = 'pending' | 'resolved' | 'rejected';

type Pending<Data> = {
  status: 'pending';
  data?: Data;
  error?: Error;
};

type Resolved<Data> = {
  status: 'resolved';
  data: Data;
  error?: undefined;
};

type Rejected = {
  status: 'rejected';
  data?: undefined;
  error: Error;
};

type Result<T> = Pending<T> | Resolved<T> | Rejected;

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
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    // 초기화(첫 렌더링) 시에는 initialResult에서 이미 fetcher를 호출했기 때문에, 초기화 이후에만 fetcher를 호출
    if (initializedRef.current) {
      responseRef.current = fetcher(...args);
      setStatus('pending');
    }
    initializedRef.current = true;
    (async () => {
      try {
        const response = await responseRef.current;
        setData(response);
        setError(undefined);
        setStatus('resolved');
      } catch (error) {
        setData(undefined);
        setError(error as Error);
        setStatus('rejected');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, ...args]);

  return { status, data, error } as Result<Data>;
}
