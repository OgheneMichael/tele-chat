import React from 'react'
import { TelepartyClient, SocketEventHandler, SocketMessageTypes } from 'teleparty-websocket-lib';
import { SocketMessage } from 'teleparty-websocket-lib/lib/SocketMessage';

interface IChatClient {
  connectionReady: boolean,
  messages: SocketMessage[]
  userList: SocketMessage['data']
  sendMessage: (message: string) => void
  joinChatRoom: (nickname: string, roomId: string) => Promise<void>
  createChatRoom: (nickname: string) => Promise<void>
  roomId?: string
  currentUser: string
  signOut: () => void
}

const useChatClient = (): IChatClient => {
  const [connectionReady, setConnectionReady] = React.useState(false)
  const [chatClient, setChatClient] = React.useState<TelepartyClient>()
  const [messages, setMessages] = React.useState<SocketMessage[]>([])
  const [messageData, setMessageData] = React.useState<SocketMessage>()
  const [userList, setUserList] = React.useState<SocketMessage['data'][]>([])
  const [roomId, setRoomId] = React.useState<string>()
  const [currentUser, setCurrentUser] = React.useState('');


  React.useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => { setConnectionReady(true) },
      onClose: () => {
        setConnectionReady(false)
        setMessages([])
        setUserList([])
        setRoomId(undefined)
      },
      onMessage: (message) => {
        if (message.type === SocketMessageTypes.SEND_MESSAGE) {
          setMessageData(message)
        }

        if (message.type === 'userList') {
          setUserList(message.data)
        }
      }
    };

    const client = new TelepartyClient(eventHandler);

    setChatClient(client)
    return () => {
      setChatClient(undefined)
    }
  }, [])

  React.useEffect(() => {
    if (!messageData) return;
    setMessages([...messages, messageData])
    setMessageData(undefined)
  }, [messageData])


  const createChatRoom = async (nickname: string) => {
    let id = await chatClient?.createChatRoom(nickname);
    setCurrentUser(nickname);
    setRoomId(id)
  }


  const joinChatRoom = async (nickname: string, roomId: string) => {
    const response = await chatClient?.joinChatRoom(nickname, roomId);
    setCurrentUser(nickname);
    const previousMessages = response?.messages.map((message) => ({ data: message })) as SocketMessage[]

    setMessages(previousMessages)

    setRoomId(roomId)
  }

  const sendMessage = (message: string) => {
    chatClient?.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message
    });
  }

  const signOut = () => chatClient?.teardown()


  return {
    messages,
    userList,
    sendMessage,
    joinChatRoom,
    createChatRoom,
    roomId,
    currentUser,
    connectionReady,
    signOut
  }
}

export default useChatClient