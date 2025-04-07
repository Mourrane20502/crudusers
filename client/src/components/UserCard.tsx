interface UserProps {
  _id: string;
  name: string;
  email: string;
  handleDelete: (id: string) => void;
}
export default function UserCard({
  _id,
  name,
  email,
  handleDelete,
}: UserProps) {
  return (
    <div>
      <li key={_id} className="flex gap-5 py-2">
        <span>
          {name} ({email})
        </span>
        <button
          onClick={() => handleDelete(_id)}
          className="text-red-500 bg-red-100 px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    </div>
  );
}
