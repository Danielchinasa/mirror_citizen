import styled, {createGlobalStyle} from "styled-components";
import {Link} from "react-router-dom";

const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}
*::-webkit-scrollbar {
  width: 0.5px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}
`;

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

const buttonBaseStyles = createGlobalStyle`
    height: 44px;
    font-family: Arial;
    font-weight: 900;
    :hover {
        cursor: pointer;
    }
`;

const colors = {
    primary: "#09C93A",
    warning: "#E10D30",
    default: "#155EC2",
    success: "#12AC3F",
    info: "#AE1DC5",
};

const hoverColors = {
    primary: "#16EF4D",
    warning: "#900B21",
    default: "#0C3875",
    success: "#0B6F29",
    info: "#5B0D68",
};

export const MainButton = styled.button`
    ${buttonBaseStyles};
    background-color: ${({type}) => colors[type]};
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: 4px;
    white-space: nowrap;
    font-size: ${({fontBig}) => (fontBig ? "20px" : "16px")};
    padding: ${({big}) => (big ? "12px 64px" : "10px 20px")};
    :hover {
        transition: all 0.3s ease-out;
        background-color: ${({type}) => hoverColors[type]};
    }
    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export const MainButtonFull = styled.button`
    ${buttonBaseStyles};
    background-color: ${({type}) => colors[type]};
    color: #ffffff;
    margin-bottom: 10px;
    border: none;
    width: 100%;
    outline: none;
    border-radius: 4px;
    white-space: nowrap;
    font-size: ${({fontBig}) => (fontBig ? "20px" : "16px")};
    padding: ${({big}) => (big ? "12px 64px" : "10px 20px")};
    :hover {
        transition: all 0.3s ease-out;
        background-color: ${({type}) => hoverColors[type]};
    }
    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export const OutlineButton = styled.button`
    ${buttonBaseStyles};
    background-color: #ffffff;
    color: ${({type}) => colors[type]};
    border: ${({type}) => `1px solid ${colors[type]}`};
    border-radius: 4px;
    white-space: nowrap;
    font-size: ${({fontBig}) => (fontBig ? "20px" : "16px")};
    padding: ${({big}) => (big ? "12px 64px" : "10px 20px")};
    :hover {
        transition: all 0.3s ease-out;
        color: ${({type}) => hoverColors[type]};
        border: ${({type}) => `1px solid ${hoverColors[type]}`};
    }
    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;
export const InfoSec = styled.div`
    padding-top: 150px;
    padding-bottom: 150px;
    background: #fff;
`;

export const Heading = styled.h4`
    font-size: 40px;
    font-weight: 600;
    font-family: Poppins;
    color: ${({lightText}) => (lightText ? "#f7f8fa" : "#1c2237")};
`;

export const CenterText = styled.div`
    text-align: center;
`;

export const Subtitle = styled.p`
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    font-family: Nunito;
    color: ${(props) => (props.color === "primary" ? "#09C93A" : props.color === "light" ? "#a9b3c1" : "#1c2237")};
`;

export const StyledForm = styled.form`
    padding: 20px;
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    text-align: left;
    color: ${(props) => (props.invalid ? "red" : "black")};
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        border-color: #09c93a !important;
    }
`;

export const BtnLink = styled(Link)`
    text-decoration: none;
`;

export default GlobalStyles;
