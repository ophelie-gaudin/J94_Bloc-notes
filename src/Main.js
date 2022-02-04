// package React qui permet d'utiliser la mise en page markdown
import ReactMarkdown from "react-markdown";

function Main({ activeNote, onUpdateNote }) {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      // ici, on a des clefs dynamiques = on va récupérer les champs
      // title (de l'input) et le champ body (text-area) ainsi que leurs valeurs seulement chaque fois qu'elles sont modifiées (et une à une).
      [key]: value,
      lastModified: Date.now(),
    });
  };

  // Va afficher qu'aucune note n'est sélectionnée quand l'application est lancée (sinon
  // erreur car le rendu des cadres dépend d'activeNote)
  if (!activeNote)
    return <div className="no-active-note">Aucune note n'est sélectionnée</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>

      <div className="app-main-note-edit">
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          id="title"
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your notes here"
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default Main;
