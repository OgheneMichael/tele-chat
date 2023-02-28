import React from 'react';

interface IChatHeader {
  roomId?: string
  createChatRoom: (userNickname: string) => void
  joinChatRoom: (userNickname: string, roomId: string) => void
  signOut: () => void
}

const ChatHeader: React.FC<IChatHeader> = ({ roomId, createChatRoom, joinChatRoom, signOut }) => {
  const [room, setRoom] = React.useState('');
  const [hostNickname, setHostNickname] = React.useState('')
  const [participant, setParticipant] = React.useState('')


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, formType: "join" | "create") => {
    e.preventDefault()
    if (formType === "create") {
      createChatRoom(hostNickname)
    } else {
      joinChatRoom(participant, room);
    }
  };


  return (
    <div className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      {!roomId ?
        <React.Fragment>
          <form onSubmit={(e) => handleSubmit(e, "create")} className="group relative flex">
            <input value={hostNickname} onChange={(e) => setHostNickname(e.target.value)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Enter room name" placeholder="Enter room name" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded">Create</button>
          </form>
          <form onSubmit={(e) => handleSubmit(e, "join")} className="group relative flex">
            <input value={participant} onChange={(e) => setParticipant(e.target.value)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm mr-4" type="text" aria-label="Create chat room" placeholder="Enter nickname" />
            <input value={room} onChange={(e) => setRoom(e.target.value)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Create chat room" placeholder="Enter room ID" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded">Join</button>
          </form>
        </React.Fragment>
        :
        <React.Fragment>
          <div>
            <h1 className="text-white font-bold text-xl">Room ID: {roomId}</h1>
          </div>
          <button onClick={signOut} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign out</button>
        </React.Fragment>
      }
    </div>
  )
};

export default ChatHeader;
