import SortIcon from "@material-ui/icons/Sort";
import React, { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
import { fetchTasks } from "../../../redux/tasks/tasks.actions";
import TaskDialog from "../../dialogs/task-dialog/TaskDialog.component";
import "./TaskListMenu.styles.scss";

const TaskListMenu = ({ fetchTasks, auth }) => {
  const sortBy = ["createdAt", "dueDate"];
  const [selectedSortIndex, setSelectedSortIndex] = useState(
    parseInt(localStorage.getItem("selectedSortIndex")) || 0
  );

  const changeSortMethod = (index) => {
    if (index === 1) {
      setSelectedSortIndex(0);
    } else {
      setSelectedSortIndex(index + 1);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedSortIndex", selectedSortIndex.toString());
  }, [selectedSortIndex]);

  useEffect(() => {
    if (!auth.loading) fetchTasks(sortBy[selectedSortIndex]);
  }, [selectedSortIndex, auth.loading]);

  // translate sortBy Array options to german
  let translatedSortBy = "";
  if (sortBy[selectedSortIndex] === "createdAt")
    translatedSortBy = "Erstellungsdatum";
  else if (sortBy[selectedSortIndex] === "dueDate")
    translatedSortBy = "Fälligkeitsdatum";
  if (sortBy[selectedSortIndex] === "importance")
    translatedSortBy = "Wichtigkeit";

  return (
    <div className="task-list-menu">
      <div className="new-task">
        <TaskDialog type="newTask" />
      </div>
      <div className="sort" onClick={() => changeSortMethod(selectedSortIndex)}>
        {translatedSortBy + " "}

        <SortIcon />
      </div>
    </div>
  );
};

const mapDispatchToProps = ({ tasks: { allTasks }, auth }) => ({
  allTasks,
  auth,
});
export default connect(mapDispatchToProps, { fetchTasks })(TaskListMenu);
