import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, DatePicker, Checkbox, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { addTask, changeTask } from "../../store/actions/actions";
import FormMessage from "./FormMessage";
import "./TaskForm.scss";

const initData = {
  content: "",
  author: "",
  descrip: "",
  date: "",
  priority: false,
  status: "",
};
const { Option } = Select;

const TaskForm = ({
  handleTaskInfoFormChange,
  handleFormChange,
  task,
  column,
}) => {
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
        handleTaskInfoFormChange();
      } else {
        dispatch(addTask(data));
        setData(initData);
        handleFormChange();
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
    <div className="form">
      <Form onFinish={handleSubmit}>
        <Button
          danger
          onClick={() =>
            handleFormChange ? handleFormChange() : handleTaskInfoFormChange()
          }
        >
          <CloseOutlined />
        </Button>

        <h3 className="form__title">
          {handleFormChange ? "Add Task" : "Task Info"}
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
          <div className="form__group">
            <Form.Item>
              <Select
                placeholder="Select a person"
                value={status}
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
            <Button htmlType="submit" type="primary">
              {handleFormChange ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TaskForm;
