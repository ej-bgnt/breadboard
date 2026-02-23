import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const findNotes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(findNotes);
  } catch (error) {
    console.error("getAllNotes controller error:", error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const findNote = await Note.findById(req.params.id);

    if (!findNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(findNote);
  } catch (error) {
    console.error("getNoteById controller error:", error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { inputTitle, inputContent } = req.body;
    const newNote = new Note({
      title: inputTitle,
      content: inputContent,
    });

    const createdNote = await newNote.save();
    res.status(201).send(createdNote);
  } catch (error) {
    console.error("createNote controller error:", error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { inputTitle, inputContent } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: inputTitle, content: inputContent },
      { returnDocument: "after" },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).send(updatedNote);
  } catch (error) {
    console.error("updateNote controller error:", error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).send({ message: "Note successfully deleted." });
  } catch (error) {
    console.error("deleteNote controller error: ", error);
    res.status(500).send({ message: "internal server error" });
  }
}
