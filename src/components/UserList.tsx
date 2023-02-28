import React from 'react';
import { SocketMessage } from 'teleparty-websocket-lib/lib/SocketMessage';

interface IUserList {
  users: SocketMessage['data'];
}

const UserList: React.FC<IUserList> = ({ users }) => (
  <div className="w-1/4 bg-gray-200 p-4 overflow-y-scroll">
    <div className="font-bold mb-4">Users In Room</div>
    <ul>
      {users.map((user: any, index: number) => (
        <li key={index} className="flex items-center mb-2">
          <span className="font-semibold capitalize">{user.userSettings.userNickname}</span>
          {user.isHost === 'true' &&
            <small
              className="ml-2 px-1 text-sm text-purple-600 rounded-full border border-purple-200 -translate-y-1">
              host
            </small>
          }
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
