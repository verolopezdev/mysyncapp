import { useState } from "react";
import { PremiumButton } from "../components/PremiumButton";

import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

import { trash } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import { todoRepository } from "../repositories/TodoRepository";
import { useTodos } from "../hooks/useTodo";
import { useUser } from "../hooks/useUser";
import { useSync } from "../hooks/useSync";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Home() {
  const todos = useTodos();
  const session = useUser();
  const sync = useSync();
  const user = useCurrentUser();

  const [title, setTitle] = useState("");

  async function addTodo() {
    if (!title.trim()) return;

    await todoRepository.add(title.trim());

    setTitle("");
  }

  if (!todos) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          Loading...
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Sync App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
          <IonItem>
            <IonLabel>
              {user
                ? `Logged in as ${user.email}`
                : "Anonymous"}
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Sync phase: {sync.phase}
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Connection: {sync.status}
            </IonLabel>
          </IonItem>

        <IonItem>
          <IonInput
            placeholder="New todo"
            value={title}
            onIonInput={(e) =>
              setTitle(e.detail.value ?? "")
            }
          />

          <IonButton slot="end" onClick={addTodo}>
            Add
          </IonButton>
        </IonItem>

        <IonList>

          {todos.map(todo => (

            <IonItem key={todo.id}>

              <IonCheckbox
                slot="start"
                checked={todo.completed}
                onIonChange={() =>
                  todoRepository.toggle(todo.id)
                }
              />

              <IonLabel>

                <h2
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.title}
                </h2>

                <p>
                  {todo.createdAt.toLocaleString()}
                </p>

              </IonLabel>

              <IonButtons slot="end">

                <IonButton
                  color="danger"
                  onClick={() =>
                    todoRepository.remove(todo.id)
                  }
                >
                  <IonIcon icon={trash} />
                </IonButton>

              </IonButtons>

            </IonItem>

          ))}

        </IonList>

        <PremiumButton />

      </IonContent>
    </IonPage>
  );
}