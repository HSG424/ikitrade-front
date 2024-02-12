type TooltipPt = string | number;

export const Tooltip = (props: { x: TooltipPt; y: TooltipPt }) => {
  return (
    <div className="tooltip">
      <p>{props.x}</p>
      <p>${props.y}</p>
    </div>
  );
};
export default Tooltip;
