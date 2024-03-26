import { JSX, MouseEvent } from "react";
import logo from "/iki-logo.png";

interface WrapperProps {
  children: JSX.Element;
  allClickHandler?: (event: MouseEvent<HTMLElement>) => void;
}

export const Wrapper = ({ children, allClickHandler }: WrapperProps) => {
  return (
    <div onClick={allClickHandler && allClickHandler}>
      <div className="outer-cont font-a">
        <header>
          <a href="https://ikitrade-front.web.app">
            <img src={logo} alt="logo" />
          </a>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Wrapper;
