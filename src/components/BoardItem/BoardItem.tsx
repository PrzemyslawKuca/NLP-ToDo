import { Draggable } from "react-beautiful-dnd";
import "./boardItem.scss";

function BoardItem({ item, index }: any) {
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => (
        <div
          className="board_item__container"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className="board_item__content">{item.name}</p>
        </div>
      )}
    </Draggable>
  );
}

export default BoardItem;
