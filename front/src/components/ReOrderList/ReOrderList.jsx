import { Draggable } from "react-drag-reorder";

export default function ReOrderList({ data, Card, onPosChange, passed }) {
  return (
    <div className="flex-container">
      <div>
        <Draggable onPosChange={onPosChange}>
          {data.map((ele, idx) => {
            return (
              <div key={idx}>
                <Card res={ele} {...passed} index={idx} />
              </div>
            );
          })}
        </Draggable>
      </div>
    </div>
  );
}
