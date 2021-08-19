import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';

const TaskCard = styled.div`
    box-shadow: 1px 7px 18px -8px ${colors.gray3};
    padding: 24px;
    width: 100%;
    background-color: ${colors.gray3};
    border-radius: 5px;
    border: 1px solid ${colors.gray};
    margin-bottom: 16px;
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const Card = ({ children }) => {
    return (
        <TaskCard>
            {children}
        </TaskCard>
    )
}

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Card.defaultProps = {
    children: "",
}

export default Card
