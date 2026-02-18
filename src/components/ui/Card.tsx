const Card = ({
  label,
  value,
  badgeClass,
}: {
  label: string;
  value: string;
  badgeClass?: string;
}) => (
  <div className="bg-card-dim border-1.5 border-border rounded-[10px] p-3.5 transition-colors">
    <div className="text-[9.5px] font-semibold tracking-widest uppercase text-text-mid mb-1.5">
      {label}
    </div>
    {badgeClass ? (
      <div
        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
      >
        {value}
      </div>
    ) : (
      <div className="text-sm font-medium text-text-primary">{value}</div>
    )}
  </div>
);

export default Card;
