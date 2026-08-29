import React from "react";
import {
  FaUmbrellaBeach,
  FaChessRook,
  FaPlaceOfWorship,
  FaMountain,
  FaChurch,
  FaAnchor,
  FaLandmark,
  FaMapMarkerAlt,
  FaTrashAlt,
} from "react-icons/fa";

import "./TaskCard.css";

// Small curated lookup so the 12 known Diu attractions each get a fitting
// icon + category tag instead of a bare text label. Anything unrecognized
// (in case activities are ever added directly in the database) falls back
// to a generic map pin with no category, so this never breaks.
const PLACE_INFO = {
  nagoa: { icon: FaUmbrellaBeach, category: "Beach" },
  ghoghla: { icon: FaUmbrellaBeach, category: "Beach" },
  chakratirth: { icon: FaUmbrellaBeach, category: "Beach" },
  jallandhar: { icon: FaUmbrellaBeach, category: "Beach" },
  gomtimata: { icon: FaUmbrellaBeach, category: "Beach" },
  diufort: { icon: FaChessRook, category: "Fort" },
  panikotha: { icon: FaChessRook, category: "Fort" },
  gangeshwar: { icon: FaPlaceOfWorship, category: "Temple" },
  nadiacaves: { icon: FaMountain, category: "Caves" },
  stpaulchurch: { icon: FaChurch, category: "Church" },
  inskhukhrimemorial: { icon: FaAnchor, category: "Memorial" },
  seashellmuseum: { icon: FaLandmark, category: "Museum" },
};

function getPlaceInfo(name = "") {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  return PLACE_INFO[key] || { icon: FaMapMarkerAlt, category: null };
}

const TaskCard = ({ title, handleDelete, index, setActiveCard }) => {
  const { icon: Icon, category } = getPlaceInfo(title);

  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="task_card_icon">
        <Icon />
      </div>
      <div className="task_card_body">
        <p className="task_text">{title}</p>
        {category && <span className="task_category">{category}</span>}
      </div>
      <button
        type="button"
        className="task_delete"
        onClick={() => handleDelete(index)}
        aria-label={`Remove ${title} from your plan`}
      >
        <FaTrashAlt />
      </button>
    </article>
  );
};

export default TaskCard;
