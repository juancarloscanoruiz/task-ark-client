import React from 'react'
import { Button as AntdButton } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../utils/colors';

const CustomButton = styled(AntdButton)`
    background: ${({ background }) => background || colors.yellow};
    border-color: ${colors.yellow};
    color: ${colors.black};
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 14px;
    &:hover {
        color: ${colors.black};
        border-color: ${colors.yellow}; 
        background: ${colors.yellowHover}; 
    }

    &:active {
        color: ${colors.black};
        border-color: ${colors.yellow}; 
        background: ${colors.yellowActive}; 
    }

    &:focus {
        color: ${colors.black};
        border-color: ${colors.yellow}; 
        background: ${colors.yellowHover}; 
    }
`;

const CustomButtonDefault = styled(AntdButton)`
background: white;
border-color: ${colors.black};
color: ${colors.black};
border-radius: 5px;
font-family: 'Poppins', sans-serif;
font-weight: 500;
font-size: 14px;
&:hover {
    color: ${colors.black};
    border-color: ${colors.black}; 
    background: ${colors.gray}; 
}

&:active {
    color: ${colors.black};
    border-color: ${colors.black}; 
    background: ${colors.gray2}; 
}

&:focus {
    color: ${colors.black};
    border-color: ${colors.black}; 
    background: ${colors.gray}; 
}
`;

const Button = ({ type, children, onClick, loading }) => {
    return (
        <>
        {
            type === "primary" ? 
            <CustomButton onClick={onClick} loading={loading} type="primary" size="large">
                {children}
            </CustomButton> : 
            (
                <CustomButtonDefault onClick={onClick} loading={loading} type="default" size="large">
                    {children}
                </CustomButtonDefault>
            )
        }

        </>
    )
}

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onClick: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
};

Button.defaultProps = {
    children: "",
    loading: false,
    type: 'Primary',
}

export default Button
