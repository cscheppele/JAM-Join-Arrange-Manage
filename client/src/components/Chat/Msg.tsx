import moment from "moment";
import { useState, useEffect } from "react";
import { MsgState } from "../../reduxFiles/slices/msg";

interface MsgProps {
  messages: MsgState[];
  userId: string | null;
  messagesRef: any;
}

const Msg = ({ messages, userId, messagesRef }: MsgProps) => {

 useEffect(() => {
  if (messagesRef.current) {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    messagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
 }, [messages, messagesRef.current]);

  const sortedMessages = [...messages].sort((a: MsgState, b: MsgState) =>
    moment(a.date).diff(moment(b.date))
  );

  return (
    <>
      {sortedMessages &&
        sortedMessages.map((messageData: MsgState, i: number) => {
          const isCurrentUser = messageData.userId === userId;

          const messageClassName = `relative text-m p-1 px-2 shadow rounded-xl m-1 ${
            isCurrentUser
              ? "bg-pink-300 border-2 border-pink-500 ml-12 text-black"
              : "bg-indigo-700 border-2 border-indigo-900 mr-12 text-white"
          } inline-block`;

          const dateClassName = `${
            isCurrentUser
              ? "flex justify-end text-slate-600 text-xs"
              : "flex justify-end text-slate-400 text-xs"
          }`;

          return (
            <div
              key={messageData.id}
              className={messageClassName}
              ref={messages.length === i + 1 ? messagesRef : undefined}
            >
              {!isCurrentUser && (
                <div className="user">
                  {messageData.User && messageData.User.profilePic && (
                    <img
                      src={messageData.User.profilePic}
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  )}
                  <div className="p-2">{messageData.User.name}</div>
                </div>
              )}

              <div className="message">{messageData.message}</div>
              <div className={dateClassName}>
                {moment(messageData.date).calendar()}
              </div>
            </div>
          );
        })}
    </>
  );
};

 export default Msg;