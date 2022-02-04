import "./App.css";

// Package React qui permet de générer des id aléatoires
import uuid from "react-uuid";

import { useEffect, useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  // Ici on déclare un state auquel Sidebar devra avoir accès pour afficher toutes les notes
  // JSON.parse analyse la chaine de charactères de localStorage.notes et la stocke dans le state notes
  //LOCAL STORAGE: on va récupérer le contenu JSON du localStorage pour retrouver les notes précédemment enregistrées
  // OU si il n'y a pas encore eu de notes enregistrées, on commence avec un tableau vide.
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  // va permettre d'afficher notre élément(note) dans Main quand on aura cliqué dessus dans la Sidebar
  const [activeNote, setActiveNote] = useState(false);

  //LOCAL STORAGE
  // stringify --> local storage ne peut stocker qu'une string, donc on convertit l'array en string
  // [notes] = dépendances --> A chaque changement des notes, la fonction en 1er paramètre s'exécute
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Nouvelle note",
      body: "",
      // va permettre d'enregistrer l'heure actuelle
      lastModified: Date.now(),
    };

    // va permettre de actualiser l'état notes (qui contient toutes les notes saisies)
    // et de fomer un nouveau tableau constitué de newNote et et tous les éléments de l'ancien state notes
    setNotes([newNote, ...notes]);

    console.log("Nouvelle note ajoutée!");
  };

  // modifie le tableau des notes, si l'id de la note parcourrue est le même que l'id de la note en cours
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    // passe dans tout le tableau notes et va regarder vérifier si l'id de la note est différent de celui de la note à supprimer
    // si cette condition est vraie = garde l'élément dans le tableau
    // si faux = le supprime
    setNotes(notes.filter((note) => note.id !== idToDelete));
    console.log("Deleted!");
  };

  // fonction qui va récupérer la note sur laquelle
  // l'user a cliqué ainsi que son contenu
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
      />

      {/* Main devra afficher la note active (seule props 
        à lui passer), il faut donc la donner au composant 
        pour qu'il puisse la rendre */}
      {/* on met la fonction getActiveNote() (elle s'éxécute automatiquement puisqu'il y a des parenthèses) */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
