import Head from 'next/head'
import ChatHeader from '@/components/ChatHeader'
import UserList from '@/components/UserList'
import ChatWindow from '@/components/ChatWindow'
import React from 'react';
import useChatClient from '@/hooks/useChatClient';



export default function Home() {
  const { connectionReady, currentUser, roomId, messages, userList, createChatRoom, joinChatRoom, sendMessage, signOut } = useChatClient()


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex flex-col">

        {!connectionReady ?
          <div className="relative flex flex-col place-self-center flex h-screen">
            <svg className="place-self-center animate-spin h-20 w-20 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

            <div>
              Connection not ready... Refresh browser or check internet
            </div>
          </div>

          :
          <>
            <ChatHeader
              joinChatRoom={joinChatRoom}
              roomId={roomId}
              createChatRoom={createChatRoom}
              signOut={signOut}
            />

            {roomId && <div className="flex-1 flex">
              <UserList users={userList} />
              <ChatWindow currentUser={currentUser} messages={messages} sendMessage={sendMessage} />
            </div>}
          </>
        }

      </main>
    </>
  )
}
