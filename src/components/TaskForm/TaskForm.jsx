import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, DatePicker, Checkbox, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { addTask, changeTask } from "../../store/actions/actions";
import FormMessage from "./FormMessage";

const initData = {
  content: "",
  author: "",
  descrip: "",
  date: "",
  priority: false,
  status: "",
};
const { Option } = Select;

const TaskForm = ({ setIsOpenForm, setIsInfoFormOpen, task, column }) => {
  const [data, setData] = useState(initData);
  const [errors, setErros] = useState([]);
  const { TextArea } = Input;
  const { content, author, descrip, priority, date, status } = data;

  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);

  useEffect(() => {
    task && setData({ ...task });
  }, [task]);

  const handleChange = (e) => {
    setData((data) => ({
      ...data,
      ...{
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleCheckChange = (e) => {
    setData({ ...data, priority: e.target.checked });
  };
  const handleChangeDate = (_, dateToString) => {
    setData({ ...data, date: dateToString });
  };

  const handleChangeSelect = (value) => {
    setData({ ...data, status: value });
  };

  const validate = () => {
    const errs = {};
    if (!content) errs.title = "Title cannot be blank";
    if (!author) errs.author = "Author cannot be blank";
    if (!date) errs.date = "Choose a date";

    return errs;
  };

  const handleSubmit = () => {
    const err = validate(data);
    setErros(err);
    if (Object.keys(err).length === 0) {
      if (task) {
        setData({ ...data, ...task });
        dispatch(changeTask(data, column));
        setIsInfoFormOpen(false);
      } else {
        dispatch(addTask(data));
        setData(initData);
        setIsOpenForm(false);
      }
    }
  };
  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }
  const config = {
    rules: [{ type: "string", message: "Please select time!" }],
  };
  return (
    <Form
      style={{
        zIndex: 999,
        width: "500px",
        background: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "50px 60px",
        boxShadow: "0px 0px 17px 0px rgba(34, 60, 80, 0.2)",
      }}
      onFinish={handleSubmit}
    >
      <Button
        danger
        style={{ position: "absolute", top: "0", right: "0", margin: ".5rem" }}
        onClick={() =>
          setIsOpenForm ? setIsOpenForm(false) : setIsInfoFormOpen(false)
        }
      >
        <CloseOutlined />
      </Button>

      <h3
        style={{ textAlign: "center", fontSize: "20px", marginBottom: "2rem" }}
      >
        {setIsOpenForm ? "Add Task" : "Task Info"}
      </h3>
      <div>
        <Form.Item label="Content">
          <Input
            placeholder="Enter content of task"
            name="content"
            onChange={handleChange}
            value={content}
          />
          {errors.title && <FormMessage>{errors.title}</FormMessage>}
        </Form.Item>
        <Form.Item label="Author">
          <Input
            placeholder="Enter author of task"
            name="author"
            onChange={handleChange}
            value={author}
          />
          {errors.author && <FormMessage>{errors.title}</FormMessage>}
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={2}
            placeholder="Enter description of task"
            name="descrip"
            onChange={handleChange}
            value={descrip}
          />
        </Form.Item>
        <Form.Item label="DatePicker" {...config}>
          <DatePicker
            disabledDate={disabledDate}
            onChange={handleChangeDate}
            name="date"
            format={"DD.MM.YYYY"}
            value={date !== "" && moment(date, "DD/MM/YYYY")}
          />
          {errors.date && <FormMessage>{errors.title}</FormMessage>}
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Item>
            <Select
              placeholder="Select a person"
              value={status}
              style={{ width: 180 }}
              onChange={handleChangeSelect}
            >
              {Object.keys(columns).map((column) => {
                return (
                  <Option key={column} value={column}>
                    {column}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Hight priority">
            <Checkbox
              onChange={handleCheckChange}
              name="priority"
              checked={priority}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
            {setIsOpenForm ? "Add" : "Save"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default TaskForm;
