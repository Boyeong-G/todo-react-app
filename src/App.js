import './App.css';
import Todo from './todo/Todo';
import AddTodo from './todo/AddTodo';
import React, { useState, useEffect } from 'react';
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from '@mui/material';
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    }) ;
  }, []);

  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{margin : 16}}>
      <List>
        {items.map((item) => (<Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} />))}
      </List>
    </Paper>
  );

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘 할 일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  /* 로딩 중이 아닐 때 렌더링할 부분 */
  let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  )

  /* 로딩 중일 때 렌더링할 부분 */
  let loadingPage = <h1> 로딩중...</h1>
  let content = loadingPage;

  if (!loading) { // 로딩 중이 아니면 todoListPage를 선택
    content = todoListPage
  }

  return (
    <div className="App">{content}</div>
  );
}

export default App;
