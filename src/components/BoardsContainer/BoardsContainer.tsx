import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useContext, useState } from "react";
import Board from "../Board/Board";
import "./boardsContainer.scss";
import BoardsContext from "../../context/BoardsContext";

function BoardsContainer() {
  const { data, setData } = useContext(BoardsContext);

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === "group") {
      const reordereddata = [...data];
      const dataourceIndex = data.findIndex((store) => store.id === source.droppableId);
      const storeDestinationIndex = data.findIndex((store) => store.id === destination.droppableId);

      const [removedStore] = reordereddata.splice(dataourceIndex, 1);
      reordereddata.splice(storeDestinationIndex, 0, removedStore);

      setData(reordereddata);
    } else {
      const { droppableId: sourceId, index: sourceIndex } = source;
      const { droppableId: destinationId, index: destinationIndex } = destination;

      const sourceStoreIndex = data.findIndex((store) => store.id === sourceId);
      const destinationStoreIndex = data.findIndex((store) => store.id === destinationId);

      const sourceItems = [...data[sourceStoreIndex].items];
      const destinationItems = sourceId !== destinationId ? [...data[destinationStoreIndex].items] : sourceItems;

      const [deletedItem] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, deletedItem);

      const updateddata = [...data];
      updateddata[sourceStoreIndex] = { ...data[sourceStoreIndex], items: sourceItems };
      updateddata[destinationStoreIndex] = { ...data[destinationStoreIndex], items: destinationItems };

      setData(updateddata);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="store">
            {data.map((store, index) => (
              <Board {...store} key={store.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default BoardsContainer;
