export default function Badge({ label, type = 'outline', icon }) {
  return (
    <span className={`badge badge--${type}`}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
