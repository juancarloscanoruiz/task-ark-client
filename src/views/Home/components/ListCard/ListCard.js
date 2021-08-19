import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import { Button, Popover, Empty, Statistic, Form } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import Card from '../../../../components/Card/Card';
import { deleteTask, getActiveTasks, getTaskById, updateTask, updateTaskStatus } from '../../../../services/task';
import { getDeadLine } from '../../../../utils/moment';
import { colors } from '../../../../utils/colors';
import OptionsCard from '../OptionsCard/OptionsCard';
import { ModalDelete } from '../ModalDelete';
import ModalUpdate from '../ModalUpdate/ModalUpdate';

const ListCardContainer = styled.div`
    margin-top: 24px;
`;

const CardTitle = styled.h4`
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
`;

const CardDescription = styled.p`
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const OptionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CountdownContainer = styled.div``;


const ListCard = ({ newTask }) => {
    
    const [tasks, setTasks] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [isLoadingOk, setIsLoadingOk] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(undefined);
    const [taskUpdated, setTaskUpdated] = useState(undefined);
    const [taskStatusUpdated, setTaskStatusUpdated] = useState(undefined);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [task, setTask] = useState({});
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { isLoading: isLoadingTaskById, data: dataTaskById } = useQuery(['getTaskById', { currentTaskId }], getTaskById, { enabled: isModalUpdateVisible});
    const { isLoading: isLoadingGet, data: dataActiveTasks } = useQuery('activeTasks', getActiveTasks);

    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(deleteTask, {
        onSuccess: data => {
            setTaskDeleted(data);
        },
        onError: () => {
          console.log("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
    });

    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(updateTask, {
        onSuccess: data => {
            setTaskUpdated(data);
        },
        onError: () => {
          console.log("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
    });

    const { mutate: mutateUpdateStatus } = useMutation(updateTaskStatus, {
        onSuccess: data => {
            setTaskStatusUpdated(data);
        },
        onError: () => {
          console.log("there was an error")
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
    });

    useEffect(() => {
        setTask(dataTaskById);
    }, [dataTaskById])

    useEffect(() => {
        if (taskDeleted) {
            const currentTasks = tasks.slice();
            const newTasks = currentTasks.filter((task) => task.id !== taskDeleted.id);
            setTasks([...newTasks]); 
        }
    }, [taskDeleted])

    useEffect(() => {
        if (taskUpdated) {
            const currentTasks = tasks.slice();
            const found = currentTasks.find((task) => task.id === taskUpdated.id);
            found.title = taskUpdated.title;
            found.description = taskUpdated.description
            found.id = taskUpdated.id;
            found.minutes = taskUpdated.minutes;
            found.seconds = taskUpdated.seconds;
            found.status = taskUpdated.status;
            found.created_at = taskUpdated.created_at;
            found.updated_at = taskUpdated.updated_at;
            
            setTasks([...currentTasks]); 
        }
    }, [taskUpdated])


    useEffect(() => {
        if (isLoadingDelete) {
            setIsLoadingOk(true)
        } else {
            setIsLoadingOk(false)
            setIsModalVisible(false);
        }
    }, [isLoadingDelete])

    useEffect(() => {
        if (isLoadingUpdate) {
            setIsLoadingOk(true)
        } else {
            setIsLoadingOk(false)
            setIsModalUpdateVisible(false);
        }
    }, [isLoadingUpdate])

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCancelUpdate = () => {
        setIsModalUpdateVisible(false);
    }

    const handleOk = () => {
        mutateDelete(currentTaskId);
        setCurrentTaskId(null);
    }

    const handleOkUpdate = () => {
        const taskModified = {}
        const formUpdateValues = form.getFieldsValue();
       taskModified.title = formUpdateValues.title;
       taskModified.description = formUpdateValues.description;
       taskModified.minutes = formUpdateValues.customDurationMinutes;
       taskModified.seconds = formUpdateValues.customDurationSeconds;

        mutateUpdate({ id: currentTaskId, data: taskModified });
        setCurrentTaskId(null);
    }

    const handleMarkAsComplete = (id) => {
        mutateUpdateStatus({ id, data: { status: true } })
    }

    const showModal = (id) => {
        setCurrentTaskId(id);
        setIsModalVisible(true);
    };

    const showModalUpdate = (id) => {
        setCurrentTaskId(id);
        setIsModalUpdateVisible(true);
    }

    useEffect(() => {
        if (dataActiveTasks) {
            setTasks(dataActiveTasks)
        }
    }, [dataActiveTasks])
    
    const countDownRef = useRef([]);

    useEffect(() => {
        const currentTasks = tasks.slice();
        const newTasks = currentTasks.filter((task) => task.id !== taskStatusUpdated.id);
        setTasks([...newTasks]); 
    }, [taskStatusUpdated])

    useEffect(() => {
        if (newTask) {
            const currentTasks = tasks.slice();
            const newTasks = [...currentTasks, newTask];
            setTasks(newTasks);
        }
    }, [newTask])

    const { Countdown } = Statistic;

    const handleStart = (refIndex) => {
        countDownRef.current[refIndex].startTimer();
    }

    const handleStop = (refIndex) => {
        countDownRef.current[refIndex].stopTimer();
    }

    const handleFinish = (id) => {
        mutateUpdateStatus({ id, data: { status: true } })
    }

    
    return (
        <ListCardContainer>
            {
                isLoadingGet ? <Empty /> : 
                tasks.map((task, i) => 
                    <Card key={task.id}>
                        <OptionsContainer>
                            <Popover content={<OptionsCard handleMarkAsComplete={() => handleMarkAsComplete(task.id)} handleUpdate={() => showModalUpdate(task.id)} handleDelete={() => showModal(task.id)} />} trigger="click">
                                <Button 
                                        type="text" 
                                        shape="circle" 
                                        icon={
                                            <EllipsisOutlined 
                                                style={{fontSize: '25px', color: colors.black}}  
                                            />
                                        }
                                    />
                            </Popover>
                        </OptionsContainer>
                        <FlexContainer>
                            <CardTitle>
                                {task.title}
                            </CardTitle>
                            <CountdownContainer>
                                <Countdown 
                                    value={getDeadLine(task.minutes, task.seconds)}
                                    ref={el => countDownRef.current[i] = el} 
                                    onFinish={() => handleFinish(task.id)}
                                />  
                                <OptionsContainer>
                                    <Button onClick={() => handleStart(i)} shape="circle" type="text">
                                        <PlayCircleOutlined />
                                    </Button>
                                    <Button onClick={() => handleStop(i)} shape="circle" type="text">
                                        <PauseCircleOutlined />
                                    </Button>  
                                </OptionsContainer>                            
                            </CountdownContainer>
                        </FlexContainer>
                        <CardDescription>
                            {task.description}
                        </CardDescription>
                    </Card>
                )
            }
            <ModalDelete isLoading={isLoadingOk} onOk={handleOk} onCancel={handleCancel} visible={isModalVisible} />
            <ModalUpdate isLoading={isLoadingOk} onOk={handleOkUpdate} data={task} form={form} visible={isModalUpdateVisible} onCancel={handleCancelUpdate} />
        </ListCardContainer>
    )
}

ListCard.propTypes = {
    newTask: PropTypes.object
}

ListCard.defaultProps = {
    newTask: undefined,
}

export default ListCard
