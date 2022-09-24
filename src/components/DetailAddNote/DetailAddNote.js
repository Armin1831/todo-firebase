import React from 'react';
import "./DetailAddNote.css";

const DetailAddNote = () => {
    return (
        <div className="add-note">
              <textarea
                  className="add-note__textarea"
                  placeholder="Add note"
                  defaultValue={""}
              />
        </div>
    );
};

export default DetailAddNote;
