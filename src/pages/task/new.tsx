import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Confirm,
  Form,
  Grid,
  Icon,
} from "semantic-ui-react";
import Layout from "src/components/Layout";
import { Task } from "src/interfaces/Task";

function Page() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [name]: value });
  };

  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const loadTask = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    const task = await res.json();
    setTask({ title: task.title, description: task.description });
  };

  const updateTask = async (id: string, task: Task) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        await createTask(task);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deleted = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    placeholder="Write your title"
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows={2}
                    placeholder="Write a description"
                    name="description"
                    onChange={handleChange}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal">
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>
          {router.query.id && (
            <Button color="red" onClick={() => setOpenConfirm(true)}>
              Delete
            </Button>
          )}
        </Grid.Column>
      </Grid>

      <Confirm
        header="Delete a task"
        content={`Are you sure you want to delete this task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
}

export default Page;
