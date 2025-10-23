import { Button } from "antd";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="header__container">
        <div className="dashboard" style={{ width: 50, flexShrink: 0 }}>
          <div className="flex items-center gap-2 font-bold">
            <span role="img" aria-label="bar-chart" className="anticon anticon-bar-chart bg-blue-500 p-px! rounded-xs">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="bar-chart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z" />
              </svg>{" "}
            </span>{" "}
            <span className="text-lg">Trello</span>
          </div>
        </div>
        <div className="header__logo" style={{ cursor: "pointer" }} />
        <div className="header__right gap-4">
          <Link to="/Login">
            <Button color="default" variant="outlined">
              Sign in
            </Button>
          </Link>
          <Link to="/Register">
            <Button color="primary" variant="solid">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
