import { useParams } from "react-router-dom";

type UserParams = {
  id: string;
};

const UserDetail = () => {
  const { id } = useParams<UserParams>(); // ✅ Lấy id từ URL /users/:id

  return (
    <div>
      <h2>User Detail</h2>
      <p>ID: {id}</p>
    </div>
  );
};
export default UserDetail;
