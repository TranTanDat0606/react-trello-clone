import { Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useTrelloContext } from "../contexts/trello-context";
import type { IFormInput } from "../type";

const { TextArea } = Input;

const FormModal = () => {
  const { trello, isModalOpen, setIsModalOpen, handleAddCard, handleChangeCard, isEditingCard } = useTrelloContext();

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      title: "",
      desc: "",
      members: [],
    },
  });

  return (
    <Modal
      title={isEditingCard ? "Edit Card" : "Add Card"}
      open={isModalOpen}
      onOk={handleSubmit(async (data) => {
        if (isEditingCard) {
          await handleChangeCard(data);
        } else {
          await handleAddCard(data);
        }
        reset();
      })}
      onCancel={() => setIsModalOpen(false)}
    >
      <form>
        <ul>
          <li className="flex gap-[10px] items-center mt-[20px]! mb-[20px]!">
            <label>Title:</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true, maxLength: 30 }}
              render={({ field }) => <Input {...field} placeholder="Enter title" />}
            />
          </li>
          <li className="flex gap-[10px] items-start mb-[10px]!">
            <label>Description:</label>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => <TextArea {...field} rows={4} placeholder="Detailed description" />}
            />
          </li>
          <li className="flex gap-[10px] items-center">
            <label>Contribution: </label>
            <Controller
              name="members"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  allowClear
                  placeholder="Select members"
                  style={{ width: "90%" }}
                  options={Object.values(trello.members).map((m) => ({
                    label: (
                      <div className="flex items-center gap-2">
                        <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full" />
                        <span>{m.name}</span>
                      </div>
                    ),
                    value: m.name,
                  }))}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </li>
        </ul>
      </form>
    </Modal>
  );
};

export default FormModal;
