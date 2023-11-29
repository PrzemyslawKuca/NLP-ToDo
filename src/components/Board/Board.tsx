import { Droppable } from "react-beautiful-dnd";
import BoardItem from "../BoardItem/BoardItem";
import "./board.scss";

function Board({ name, items, color, id }: any) {
  return (
    <div className="board__wrapper">
      <div className={`board__title board__title--${color}`}>
        <h3>{name}</h3>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`board__container board__container--${color}`}
          >
            <div>
              {items.map((item: any, index: number) => (
                <BoardItem item={item} index={index} key={item.id} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
