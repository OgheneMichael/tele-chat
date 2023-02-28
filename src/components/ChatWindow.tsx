import React from 'react';
import { SocketMessage } from 'teleparty-websocket-lib/lib/SocketMessage';

interface IChatWindow {
  currentUser: string;
  messages: SocketMessage[];
  sendMessage: (message: string) => void;
}

const ChatWindow: React.FC<IChatWindow> = ({ currentUser, messages, sendMessage }) => {
  const [messageText, setMessageText] = React.useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(messageText);
    setMessageText('');
  };

  return (
    <div className="w-3/4 p-4 flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {messages.map(({ data }, index) => (
          <div key={index} className={`flex items-center mb-4 ${data.userNickname === currentUser ? 'justify-end' : ''}`}>
            <div className={`relative bg-gray-100 rounded-lg p-4 ${data.userNickname === currentUser ? 'ml-auto' : ''}`}>
              <small
                className="absolute px-1 text-sm text-purple-600 -translate-y-4 -translate-x-4 capitalize">
                {data.userNickname}
              </small>
              {data.body}
            </div>
          </div>
        ))}
      </div>
      <form className="flex justify-between items-center" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message here"
          className="border rounded-lg py-2 px-4 flex-1 mr-2"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        />
        <button
          type='submit'
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

