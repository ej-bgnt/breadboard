import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimiterUI from "../components/RateLimiterUI";
import NoteCard from "../components/NoteCard";

function HomePage() {
  const [isRateLimited, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimit(false);
      } catch (error) {
        console.log("error fetching notes");
        if (error.response?.status === 429) {
          setRateLimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimiterUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length === 0 && !isRateLimited && <NotesNotFound />}
            {notes.map((i) => {
              return <NoteCard key={i._id} note={i} setNotes={setNotes} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
