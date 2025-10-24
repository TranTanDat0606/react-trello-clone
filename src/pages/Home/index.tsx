import { Button, Typography, Tag } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-start pt-[135px]! min-h-[93vh] bg-gray-50 px-4 text-center">
      {/* Badge */}
      <Tag color="gold" className="mb-4 text-sm font-semibold flex py-[6px]! px-[10px]! items-center">
        <img src="/icon-number-1.png" alt="icon-number-1" className="w-[30px] h-[30px]" />
        NO1 TASK MANAGEMENT
      </Tag>

      {/* Main Title */}
      <Typography.Title level={2} className="mb-2 mt-3!">
        Trello helps teams move{" "}
        <div>
          <button
            className="m-3! px-8! py-2! text-white uppercase rounded-lg shadow-lg
  transition-all duration-500 bg-[length:200%_auto]
  bg-gradient-to-r from-[#EECDA3] via-[#EF629F] to-[#EECDA3]
  hover:bg-right"
          >
            work forward.
          </button>
        </div>
      </Typography.Title>

      {/* Subtitle */}
      <Typography.Paragraph className="max-w-xl text-gray-500 mb-6">
        Collaborate, organize tasks, and reach new productivity heights. From busy offices to home setups, the way your
        team works is unique — accomplish it all with Trello.
      </Typography.Paragraph>

      {/* Button */}
      <Link to="/Register">
        <Button type="primary" size="large">
          Sign up for Trello
        </Button>
      </Link>
    </div>
  );
};

export default Home;
