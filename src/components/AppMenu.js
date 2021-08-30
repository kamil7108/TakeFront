import * as Styled from "./AppMenu.styles";


const AppMenu = () => {
  return (
    <Styled.MenuBar>
      <Styled.MenuList>
        <Styled.MenuElement to="/car">
            Cars
        </Styled.MenuElement>
        <Styled.MenuElement to="/customer">
            Customers
        </Styled.MenuElement>
        <Styled.MenuElement to="/rute">
            Rutes
        </Styled.MenuElement>
      </Styled.MenuList>
    </Styled.MenuBar>
  );
};

export { AppMenu };