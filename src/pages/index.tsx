import { useRouter } from "next/router";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import Layout from "src/components/Layout";
import TaskList from "src/components/tasks/TaskList";
import { Task } from "src/interfaces/Task";

interface Props {
  tasks: Task[];
}

function Index({tasks}: Props) {
  const router = useRouter();
  return <Layout>{tasks.length === 0 ? 
      <Grid columns={3} centered verticalAlign="middle" style={{heigth: '70%'}}>
        <Grid.Column>
          <h1>No hay tareas aún</h1>
          <Button onClick={() => router.push('/task/new')}>Create one</Button>
        </Grid.Column>
      </Grid>
    : <TaskList tasks={tasks}/>
  }</Layout>
}

export default Index;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  console.log(tasks);

  return {
    props: {
      tasks: tasks,
    },
  };
};
