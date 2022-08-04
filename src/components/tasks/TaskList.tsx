import { useRouter } from "next/router";
import React from "react";
import { Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta } from "semantic-ui-react";
import { Task } from "src/interfaces/Task";

interface Props {
  tasks: Task[];
}

function TaskList({ tasks }: Props) {
    console.log(tasks)
    const router = useRouter();
  return (
    <CardGroup itemsPerRow={4}>
        {tasks.map((task: Task) =>(
            <Card key={task.id} onClick={() => router.push(`/task/edit/${task.id}`)}>
                <CardContent>
                    <CardHeader>{task.title}</CardHeader>
                    {task.created_on && (
                        <CardMeta>{new Date(task.created_on).toLocaleDateString()}</CardMeta>
                    )}
                    <CardDescription>{task.description}</CardDescription>
                </CardContent>
            </Card>
        ))}
    </CardGroup>
  )
}

export default TaskList;
