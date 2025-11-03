import { Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useTrelloContext } from "../contexts/trello-context";
import type { IFormInput } from "../types/type";
import React from "react";

const { TextArea } = Input;

const FormModal = () => {
  const { trello, isModalOpen, setIsModalOpen, handleAddCard, handleChangeCard, isEditingCard } = useTrelloContext();

  const { control, handleSubmit, reset, setValue } = useForm<IFormInput>({
    defaultValues: {
      title: "",
      desc: "",
      image: "",
      members: [],
    },
  });

  React.useEffect(() => {
    if (isEditingCard) {
      setValue("title", isEditingCard.title);
      setValue("desc", isEditingCard.description);
      setValue("image", isEditingCard.image);
      setValue("members", isEditingCard.members);
    } else {
      reset();
    }
  }, [isEditingCard, setValue, reset]);

  return (
    <Modal
      title={isEditingCard ? "Edit Card" : "Add Card"}
      open={isModalOpen}
      maskClosable={false}
      onOk={handleSubmit(async (data) => {
        if (isEditingCard) {
          await handleChangeCard(data);
        } else {
          await handleAddCard(data);
        }
        reset();
      })}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <form>
        <ul>
          <li className=" flex gap-[10px] items-center justify-between mt-[20px]! mb-[20px]!">
            <label>Title:</label>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Please Enter the title name.",
                maxLength: { value: 30, message: "Max 30 characters" },
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  placeholder={error ? error.message : "Enter title"}
                  className="max-w-[380px]"
                  status={error ? "error" : ""}
                />
              )}
            />
          </li>
          <li className="flex gap-[10px] items-start justify-between mb-[20px]!">
            <label>Description:</label>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => (
                <TextArea {...field} rows={4} placeholder="Detailed description" className="max-w-[380px]!" />
              )}
            />
          </li>
          <li className="flex gap-[10px] items-center justify-between mb-[20px]!">
            <label>Contribution: </label>
            <Controller
              name="members"
              control={control}
              rules={{ required: "Select at least one member" }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  mode="multiple"
                  allowClear
                  placeholder={error ? error.message : "Select members"}
                  style={{ width: "90%" }}
                  className={error ? "placeholder:text-red-500" : ""}
                  status={error ? "error" : ""}
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
