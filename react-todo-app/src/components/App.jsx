import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function onAdd(newNote) {
    setNotes((prev) => {
      return [...prev, newNote];
    });
  }

  function onDelete(targetNote) {
    setNotes((prev) => {
      return prev.filter((noteItem, index) => {
        return index !== targetNote;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={onAdd} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            deletePass={onDelete}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
