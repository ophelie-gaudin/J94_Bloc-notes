// ({ props de Sidebar }) : Il faudra récupérer les notes depuis le state de App.js
// ainsi que la fonction onAddNote qui est déclarée dans App.js
function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {
  // classe les notes par date croissante de modification
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Mon Bloc-notes</h1>
        <button className="red-button" onClick={onAddNote}>
          Ajouter une note
        </button>
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          // ajoute la classe "active" seulement si l'id de la note correspond à celui de l'activeNote
          <div
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <h3>{note.title}</h3>

              {/* btn pour supprimer a note, pour savoir laquelle on 
              veut supprimer, on prend son id en argument de fonction onDeleteNote (déclarée dans App.js) */}
              <button onClick={() => onDeleteNote(note.id)}>X</button>
            </div>

            {/* Si il y a un body dans la note, 
            on ne veut afficher qu'un extrait de 100 charactères + "..." */}
            <p>{note.body && note.body.substr(0, 100) + " ..."}</p>
            <small className="note-meta">
              Modifié le [
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              ]
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
