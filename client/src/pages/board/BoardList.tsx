import { List } from 'store/commonTypes';
import { IconButton } from 'components/common';
import { ReactNode } from 'react';

type BoardListProps = {
  children?: ReactNode;
  list: List;
  onRemoveList?: () => void;
};

const BoardList = ({ children, list, onRemoveList, ...props }: BoardListProps) => {
  return (
    <div {...props} className="p-2 mr-2 bg-white rounded-lg shadow-lg h-fit">
      <div className="flex items-center justify-between mb-2">
        <p className="w-32 text-sm font-semibold">{list.title}</p>
        <div className="flex justify-between ml-2">
          <IconButton
            name="remove"
            className="w-8 bg-transparent border-0 shadow-transparent tn-xs"
            aria-label="delete a list"
            onClick={onRemoveList}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default BoardList;
