import noMatch from '@/assets/no-match.png';
import { Subtitle } from '@/components/common';

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <img src={noMatch} alt="No Match" className="w-96" />
        <Subtitle className="mt-3 ml-12">Oops..! No page found!</Subtitle>
      </div>
    </div>
  );
};

export default NoMatch;
