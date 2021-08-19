import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Home } from './views/Home';
import { TasksChart } from './views/TasksChart'
import styled from 'styled-components';
import { colors } from './utils/colors';
import "antd/dist/antd.css";
import { ListCompletedTasks } from './views/ListCompletedTasks';

function App() {

  const FlexContainer = styled.div`
    display: flex;
  `;

  const CustomSider = styled.div`
    height: 100vh;
    background-color: ${colors.gray};
    padding: 16px;
    width: 20%;
    max-width: 300px;
    min-width: 300px;
  `

  const CustomLink = styled(Link)`
    padding: 16px;
    display: block;
    background: white;
    box-shadow: 1px 7px 18px -8px #d4d4d4;
    border-radius: 5px;
    margin-bottom: 16px;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    color: ${colors.black};

    &:hover {
      color: ${colors.yellow};
    }
  `;
  const LinksContainer = styled.div`
    margin-top: 24px;
  `

  const Content = styled.div`
    width: 80%;
    padding: 24px;
  `;

  return (
    <Router>
        <FlexContainer>
            <CustomSider style={{maxWidth: 'auto'}}>
              <LinksContainer>
                <CustomLink to="/">
                  Inicio
                </CustomLink>
                <CustomLink to="/completed">
                  Historial de tareas
                </CustomLink>
                <CustomLink to="/productivity">
                  Mi productividad
                </CustomLink>
              </LinksContainer>
            </CustomSider>
            <Content>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/productivity" component={TasksChart} />
                  <Route exact path="/completed" component={ListCompletedTasks} />
              </Switch>
            </Content>
        </FlexContainer>
    </Router>
  );
}

export default App;
