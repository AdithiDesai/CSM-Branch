# CSM-Branch

A messaging web application built as a take away assignment for Branch International. The application is built using Next JS, Firebase and Tailwind CSS.

- To run the app locally, follow the steps below:\
  `cd csm` \
  `yarn install` \
  `yarn dev`
- The app should be available on localhost:3000

## Key Features

### 1. Agents

- Agents can login from the ui and will be assigned a unique uuid. This uuid will be used to identify the agent in the database. The agent will be able to see all the conversations assigned to them or if the conversation is unassigned.

### 2. Messaging

- Initially, a conversation will be unassigned to any agent. The first agent to respond to the conversation will be assigned the conversation.
- When an agent responds to a conversation, the conversation will be assigned to them and the conversation will be visible only to them.
- This prevents multiple agents from responding to the same conversation.

### 3. Data Handling

- I'm using Firebase Firestore to store the data. The data is structured as follows:
  1. Conversations: This collection stores all the conversations. Each conversation has a unique id and the following fields:
     - id: The unique id of the conversation.
     - agentuuid: The id of the agent assigned to the conversation.
     - messages: An array of messages in the conversation.
     - timestarted: The time the conversation was started.
  2. Agents: This collection stores all the agents. Each agent has a unique id and the following fields:
     - id: The unique id of the agent.
     - name: The name of the agent.

### 4. User Interface and Serverless API

- The UI was built using Next JS and Tailwind and Next 14's [serverless functions](https://clouddevs.com/next/serverless-functions/#:~:text=full%2Dstack%20applications.-,NEXT.,need%20for%20separate%20backend%20services.)
