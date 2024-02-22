import styled from './style.module.scss';
import SVG from 'shared/SVG';
import favicon from 'shared/icons/favicon.png';

export default function Header() {
  return (
    <>
      <>
        <header className={styled.header}>
          <div className={styled.container}>
            <div className={styled.titleWrapper}>
              <img src={favicon} className={styled.titleImg} alt="" />
              <h1 className={styled.title}>poster</h1>
            </div>

            <div className={styled.inputWrapper}>
              <SVG
                href="#search"
                svgClassName={styled.searchSvg}
                useClassName={styled.searchUse}
              />
              <input
                className={styled.input}
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
        </header>
      </>
    </>
  );
}
