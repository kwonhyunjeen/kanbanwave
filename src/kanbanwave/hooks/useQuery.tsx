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
  const responseRef = useRef<Data | Promise<Data>>(fetcher(...args));

  // 비동기 함수가 아닌 경우 초기 상태를 resolved로 설정
  const initialResult = useMemo<Result<Data>>(() => {
    const response = responseRef.current;
    if (response instanceof Promise) {
      return { status: 'pending', data: undefined };
    }
    return { status: 'resolved', data: response };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [status, setStatus] = useState<Status>(initialResult.status);
  const [data, setData] = useState<Data | undefined>(initialResult.data);

  useEffect(() => {
    (async () => {
      responseRef.current = fetcher(...args);
      const response = await responseRef.current;
      setData(response);
      setStatus('resolved');
      responseRef.current = undefined as Data;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, ...args]);

  return { status, data } as Result<Data>;
}
