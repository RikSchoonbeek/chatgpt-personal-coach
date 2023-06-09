const Snippet = ({
  snippet,
  onAddSnippet,
  onDeleteSnippet,
  onRenameSnippet,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newSnippetTitle, setNewSnippetTitle] = useState("");
  const [snippetToDeleteID, setSnippetToDelete] = useState(null);
  const [snippetToRenameID, setSnippetToRename] = useState(null);
  const [newSnippetName, setNewSnippetName] = useState("");

  const addSnippet = () => {
    axios
      .post(apiUrls.snippet(), { name: newSnippetTitle })
      .then((res) => {
        const newSnippet = res.data;
        onAddSnippet(newSnippet);
        setNewSnippetTitle("");
      })
      .catch((err) => {
        alert("Error creating snippet");
        window.debug(err.response.data);
      })
      .finally(() => setShowAddModal(false));
  };

  const deleteSnippet = () => {
    axios
      .delete(apiUrls.snippet(snippetToDeleteID))
      .then(() => onDeleteSnippet(snippetToDeleteID))
      .catch((err) => {
        alert("Error deleting snippet");
        window.debug(err.response.data);
      })
      .finally(() => {
        setSnippetToDelete(null);
        setShowDeleteModal(false);
      });
  };

  const renameSnippet = () => {
    axios
      .patch(apiUrls.snippet(snippetToRenameID), { name: newSnippetTitle })
      .then((res) => {
        onSnippetRename(snippetToRenameID, newSnippetTitle);
        setNewSnippetName("");
      })
      .catch((err) => {
        alert("Error renaming snippet");
        window.debug(err.response.data);
      })
      .finally(() => {
        setSnippetToRename(null);
        setShowRenameModal(false);
      });
  };

  return (
    <div>
      <span>{snippet.name}</span>
      <div>
        <button
          onClick={() => {
            setSnippetToDelete(snippet);
            setShowDeleteModal(true);
          }}
        >
          D
        </button>
        <button
          onClick={() => {
            setSnippetToRename(snippet.id);
            setShowRenameModal(true);
          }}
        >
          R
        </button>
      </div>

      
    </div>
  );
};

export default Snippet;
