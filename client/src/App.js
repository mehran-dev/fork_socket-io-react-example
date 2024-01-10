import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const joinTo = (theRoom) => {
    if (theRoom !== "") {
      setRoom(theRoom);
      socket.emit("join_room", theRoom);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App" onClick={() => {}}>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <div>
        <button
          onClick={() => {
            joinTo("node");
          }}
        >
          {" "}
          node{" "}
        </button>{" "}
        <button
          onClick={() => {
            joinTo("react");
          }}
        >
          {" "}
          react{" "}
        </button>{" "}
        <button
          onClick={() => {
            joinTo("django");
          }}
        >
          {" "}
          django{" "}
        </button>
      </div>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
