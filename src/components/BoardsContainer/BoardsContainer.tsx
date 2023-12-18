import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useContext } from "react";
import Board from "../Board/Board";
import "./boardsContainer.scss";
import BoardsContext from "../../context/BoardsContext";

const BoardsContainer: React.FC = () => {
  const { data, setData } = useContext(BoardsContext);

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceStoreIndex = data.findIndex((store) => store.id === source.droppableId);
    const destinationStoreIndex = data.findIndex((store) => store.id === destination.droppableId);

    if (type === "group") {
      const reorderedData = Array.from(data);
      const [removedStore] = reorderedData.splice(sourceStoreIndex, 1);
      reorderedData.splice(destinationStoreIndex, 0, removedStore);
      setData(reorderedData);
    } else {
      const sourceItems = Array.from(data[sourceStoreIndex].items);
      const destinationItems =
        source.droppableId !== destination.droppableId ? Array.from(data[destinationStoreIndex].items) : sourceItems;

      const [deletedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, deletedItem);

      const updatedData = Array.from(data);
      updatedData[sourceStoreIndex] = { ...data[sourceStoreIndex], items: sourceItems };
      updatedData[destinationStoreIndex] = { ...data[destinationStoreIndex], items: destinationItems };

      setData(updatedData);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="store">
            {data.map((store) => (
              <Board {...store} key={store.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardsContainer;
