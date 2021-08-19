import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Modal, Form, Input, Select, Switch, InputNumber } from 'antd';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { createTask } from '../../services/task';
import { useMutation, useQueryClient } from 'react-query';
import ListCard from './components/ListCard/ListCard';

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [isLoadingOk, setIsLoadingOk] = useState(false);
    const [newTasAdded, setNewTaskAdded] = useState(undefined);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields()
    };
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(createTask, {
        onSuccess: data => {
            setNewTaskAdded(data);
        },
        onError: () => {
          console.log("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
    });
   
    useEffect(() => {
        if (isLoading) {
            setIsLoadingOk(true);
        } else {
            setIsLoadingOk(false);
            setIsModalVisible(false);
        }
    }, [isLoading])

      
    const handleOk = () => {
        const formValues = form.getFieldsValue();
        const newTask = {};
        newTask.title = formValues.title;
        newTask.description = formValues.description;
        newTask.status = 0;
        if (formValues.preDuration) {
            newTask.minutes = formValues.preDuration;
            newTask.seconds = 0;
        } else {
            newTask.minutes = formValues.customDurationMinutes;
            newTask.seconds = formValues.customDurationSeconds;
        }
        mutate(newTask);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

    const handleChangeCheckbox = (checked, e) => {
        setIsCheckboxChecked(checked);
    }

    const handlePreDurationChange = (value) => {
        const currentValues = form.getFieldsValue();
        form.setFieldsValue({
            ...currentValues,
            "preDuration": value,
        })
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Agregar nueva tarea
            </Button>
            <ListCard newTask={newTasAdded} />
            <Modal 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                closeIcon={false}
                footer={[
                    <Button type="default" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button loading={isLoadingOk} type="primary" onClick={handleOk}>
                        Aceptar
                    </Button>
                ]}
            >
                <Form
                    layout="vertical"
                    form={form}
                >
                    <LabelForm htmlFor="task-title">Título</LabelForm>
                    <Form.Item name="title">
                        <CustomInput id="task-title" placeholder="Título de la tarea" />
                    </Form.Item>
                    <LabelForm htmlFor="task-description">Descripción</LabelForm>
                    <Form.Item name="description">
                        <CustomInput id="task-description" placeholder="Descripción de la tarea" />
                    </Form.Item>

                    <Form.Item>
                        <LabelForm>Duración personalizada</LabelForm>
                        <Switch onChange={(checked, e) => handleChangeCheckbox(checked, e)} />
                    </Form.Item>

                    {
                        !isCheckboxChecked ? (
                            <Form.Item name="preDuration">
                                <LabelForm htmlFor="task-pre-duration">Duraciones predeterminadas</LabelForm>
                                <Select onChange={(value) => handlePreDurationChange(value)} id="task-pre-duration">
                                    <Select.Option value="30">Corta: 30 minutos</Select.Option>
                                    <Select.Option value="45">Mediana: 45 minutos</Select.Option>
                                    <Select.Option value="60">Larga: 60 minutos</Select.Option>
                                </Select>
                            </Form.Item>
                        ) : (
                            <FlexContainer>
                                <CustomDurationContainer>
                                    <LabelForm htmlFor="">Minutos</LabelForm>
                                    <Form.Item name="customDurationMinutes" rules={[{ type: 'number', min: 0, max: 120 }]}>
                                        <InputNumber max={120} />
                                    </Form.Item>
                                </CustomDurationContainer>
                                <CustomDurationContainer>
                                    <LabelForm htmlFor="">Segundos</LabelForm>
                                    <Form.Item name="customDurationSeconds" rules={[{ type: 'number', min: 1, max: 59 }]}>
                                        <InputNumber />
                                    </Form.Item>
                                </CustomDurationContainer> 
                            </FlexContainer>
                        )
                    }
                </Form>
            </Modal>
        </>
    )
}

export default Home
