import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCompletedTasks } from '../../services/task';
import { Empty } from 'antd';
import styled from 'styled-components';
import Card from '../../components/Card/Card';

const ListCompletedTasks = () => {

    const { isLoading, data } = useQuery('getCompletedTasks', getCompletedTasks)

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

    return (
        
        isLoading ? <Empty /> : data.map((task) => <Card>
                                <Card key={task.id}>
                        <FlexContainer>
                            <CardTitle>
                                {task.title}
                            </CardTitle>
                        </FlexContainer>
                        <CardDescription>
                            {task.description}
                        </CardDescription>
                    </Card>
        </Card>)
        
    )
}

export default ListCompletedTasks
