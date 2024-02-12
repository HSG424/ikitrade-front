type TooltipPt = string | number;

interface TooltipProps {
  x: TooltipPt;
  y: TooltipPt;
}

const Tooltip = ({ x, y }: TooltipProps) => {
  return (
    <div className="tooltip">
      <p>{x}</p>
      <p>${y}</p>
    </div>
  );
};

export default Tooltip;
