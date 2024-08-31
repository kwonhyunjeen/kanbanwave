import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-6 py-5 text-black">
      <Link to="/boards" className="inline-flex align-top">
        <span className="inline-flex items-center gap-[8px]">
          <svg
            className="inline-block h-[22px]"
            viewBox="0 306 640 412"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#87CEEB"
              d="M0 512c0 113.7 92.3 206 206 206 82.3 0 153.6-48.6 186.6-118.9 18.8 48.6 64.6 83.9 118.5 83.9 70.7 0 128-57.3 128-128s-57.3-128-128-128c-55.9 0-101.7 35.3-120.5 83.9C359.6 354.6 288.3 306 206 306 92.3 306 0 398.3 0 512z"
            />
          </svg>
          <span className="[color:#0f172a] [font-size:20px] [font-weight:500] [line-height:1]">
            KanbanWave
          </span>
        </span>
      </Link>
    </header>
  );
};

export default Header;
