import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber  } from'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../../components/Button';
import { colors } from '../../../../utils/colors';

const LabelForm = styled.label`
font-family: 'Poppins', sans-serif;
color: ${colors.black};
margin-bottom: 8px;
display: block;
`;

const CustomInput = styled(Input)`
font-family: 'Roboto', sans-serif;
color: ${colors.black2};
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
`;


const CustomDurationContainer = styled.div`
    &:first-of-type {
        margin-right: 16px;
    }
`;

const ModalUpdate = ({ form, visible, onOk, onCancel, isLoading, data }) => {

    useEffect(() => {
        form.setFieldsValue({
            "title": data.title,
            "description": data.description,
            "customDurationMinutes": data.minutes,
            "customDurationSeconds": data.seconds,
        })
    }, [data])

    return (
        <Modal          
            visible={visible}
            closeIcon={false}
            onCancel={onCancel}
            onOk={onOk}
            footer={[
                <Button onClick={onCancel} type="default">
                    Cancelar
                </Button>,
                <Button onClick={onOk} loading={isLoading} type="primary">
                    Aceptar
                </Button>
            ]}
        >
                <Form
                    layout="vertical"
                    form={form}
                >
                    <LabelForm htmlFor="task-title-update">Título</LabelForm>
                    <Form.Item name="title">
                        <CustomInput id="task-title-update" placeholder="Título de la tarea" />
                    </Form.Item>
                    <LabelForm htmlFor="task-description-update">Descripción</LabelForm>
                    <Form.Item name="description">
                        <CustomInput id="task-description-update" placeholder="Título de la tarea" />
                    </Form.Item>
                    <FlexContainer>
                        <CustomDurationContainer>
                            <LabelForm htmlFor="">Minutos</LabelForm>
                            <Form.Item name="customDurationMinutes" rules={[{ type: 'number', min: 0, max: 120 }]}>
                                <InputNumber />
                            </Form.Item>
                        </CustomDurationContainer>
                        <CustomDurationContainer>
                            <LabelForm htmlFor="">Segundos</LabelForm>
                            <Form.Item name="customDurationSeconds" rules={[{ type: 'number', min: 1, max: 59 }]}>
                                <InputNumber />
                            </Form.Item>
                        </CustomDurationContainer>
                    </FlexContainer>

                </Form>
        </Modal>
    )
}

ModalUpdate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object
}

ModalUpdate.defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    isLoading: false,
    data: {}
}

export default ModalUpdate
