import { Link } from "react-router-dom";
import styled from "styled-components";


const MenuBar = styled.header`
    width: 100%;
    height: 80px;
    background: ${({theme}) => theme.palette.background.default};
    border-bottom: 1px solid ${({theme}) => theme.palette.outline.grey};
`;

const MenuIcon = styled.div`
    flex: 20%;
    width: 45px;
    padding: 0px 15px 0px 0px;
`;

const MenuList = styled.div`
    display: flex;
    height: 81px;
`;

const MenuElement = styled(Link)`
    display: flex;
    padding: 20px 40px;
    text-decoration: none;
    font-size: 24px;
    transition: 0.5s all;
    &:hover {
        color: ${({theme}) => theme.palette.background.default};
        background: ${({theme}) => theme.palette.primary.main};
    }
    &:active {
        transition: 0.1s all;
        background: ${({theme}) => theme.palette.outline.grey};
        color: #000;
    }
`;

const MenuElementToRight  = styled(MenuElement)`
    margin-left: auto;
`;

export { MenuBar, MenuList, MenuElement, MenuIcon, MenuElementToRight };