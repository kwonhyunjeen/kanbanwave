import noMatch from '@/assets/no-match.png';
import { Subtitle } from '@/components/common';

const NoMatch = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <img src={noMatch} alt="No Match" className="w-96" />
        <Subtitle className="ml-12 mt-3">Oops..! No page found!</Subtitle>
      </div>
    </div>
  );
};

export default NoMatch;
