export default function Cardlist({ el }) {
  return (
    <div className="card">
      <p>{el.id}</p>
      <p>{el.title}</p>
      <p>{el.body}</p>
    </div>
  );
}
