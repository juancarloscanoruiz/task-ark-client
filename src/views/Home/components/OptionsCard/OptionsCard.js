import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Option = styled.div`
    display: flex;
    align-items: center;
`;

const OptionsText = styled.p`
    margin-left: 16px;
    margin-bottom: 0;
`;

const CustomButton = styled(Button)`
    display: block;
`;

const OptionsCard = ({ handleDelete, handleUpdate, handleMarkAsComplete }) => {
    return (
        <>
                <CustomButton type="text" onClick={handleDelete}>
                    <Option>
                        <DeleteOutlined />
                        <OptionsText>
                            Eliminar
                        </OptionsText>
                    </Option>
                </CustomButton>
                <CustomButton type="text" onClick={handleUpdate}>
                    <Option>
                        <EditOutlined />
                        <OptionsText>
                            Editar
                        </OptionsText>
                    </Option>
                </CustomButton>
                <CustomButton type="text" onClick={handleMarkAsComplete}>
                    <Option>
                        <CheckOutlined />
                        <OptionsText>
                            Marcar como completada
                        </OptionsText>
                    </Option>
                </CustomButton>
                
        </>
    )
}

OptionsCard.propTypes = {
    handleDelete: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleMarkAsComplete: PropTypes.func
}

OptionsCard.defaultProps = {
    handleDelete: () => {},
    handleUpdate: () => {},
    handleMarkAsComplete: () => {}
}

export default OptionsCard
